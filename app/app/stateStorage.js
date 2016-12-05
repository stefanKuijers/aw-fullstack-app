
import storage from 'electron-json-storage';

export const SAVE_STATE = 'SAVE_STATE';

const defaultData = {
	projects: [
		{
			id: 100,
			name: '...',
			url: null,
			state: 'ready to be started',
			running: false,
			configId: 100
		},
		{
			id: 101,
			name: '...',
			url: null,
			state: 'ready to be started',
			running: false,
			configId: 101
		}
	],
	options: {
		currentConfigId: 100,
		'100': {
			id: 100,
			projectId: 100,
			name: 'AW Fullstack',
			path: 'C:/Users/Felhasznalo/dev/aw-fullstack/',
			watch:  {
				enabled: true,
				globs: [
					'public_html/**/*', 
					'!public_html/**/dist/**/*',
					'bower.json',
				]
			},
			server:  {
				type: 'express',
				target: 'public_html/'
			},
			sass: {
				enabled: true,
				outputDir: 'public_html/style/dist',
				globs: [
					'public_html/style/src/var.scss', 
					'public_html/style/src/**/*.scss'
				]
			},
			javascript: {
				enabled: false,
				outputDir: 'public_html/js/dist',
				globs: [
					'public_html/js/src/index.js',
					'public_html/js/src/**/*.js',
				]
			},
			dependencyManagement: {
				enabled: false
			}
		},
		'101': {
			id: 101,
			projectId: 101,
			name: 'Another Project',
			path: '',
			watch:  {
				enabled: true,
				globs: []
			},
			server:  {
				type: 'proxy',
				target: 'project.dev'
			},
			sass: {
				enabled: false,
				outputDir: '',
				fontsDir: '',
				globs: []
			},
			javascript: {
				enabled: false,
				outputDir: '',
				globs: []
			},
			dependencyManagement: {
				enabled: false
			}
		}
	}
};
let saveStateDebounce = 0;


export function getStoredState(key, callback) {
	storage.get(key, function(error, data) {
		if (error) throw error;
		callback(verifyData(key, data));
	});
}

export function stateStorageMiddleware({getState}) {
  return (next) => (action) => {
    const result = next(action);

    switch(action.type) {
	    case SAVE_STATE:
	    	saveState(action.payload, getState);
	    	break;

	    default:
	    	if (process.env.NODE_ENV != 'development') {
	    		console.log(action.type, getState());
	    	}
	    	break;
    	
    }

    return result;
  };
};

function verifyData(key, data) {
	switch(key) {
		case 'projects':
			return data.length ? data : defaultData[key];

		case 'options':
			return Object.keys().length ? data : defaultData[key];

		default: return data;	
	}
}



function saveState(key, getState) {
	if (saveStateDebounce) clearTimeout(saveStateDebounce);

	saveStateDebounce = setTimeout(() => {
		const state = getState();

		storage.set(key, state[key], function(error) {
			if (error) throw error;
			
			saveStateDebounce = 0;
		});
	}, 1500);
}

