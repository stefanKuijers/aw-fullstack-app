
import React from 'react';
import { shell } from 'electron';

import styles from './HelpCenter.css';
export const helpStyles = styles;


export const globsExplenation = (<article>
	<header>
		<h3>How to use globs</h3>
	</header>
	<section>
		<p>Globs are strings which are used to match and filter through files. In this case we use the <span onTouchTap={(e) => {shell.openExternal("https://github.com/isaacs/minimatch")}}>minimatch</span> pattern.</p>
		<p>All the globs will be executed relative to the root path of the current project.</p>
		<p>A glob adds the matching files to the list. The following glob can add new files or take files of the list. Because of this reason order matters.</p>
	</section>

	<section>
		<table style={{width: '100%'}}>
			<caption>Examples</caption>
			<tbody>
				<tr>
					<td>public_html/**/*.html</td>
					<td>Adds any html-file any folder deep</td>
				</tr>
				<tr>
					<td>!**/dist/**/*</td>
					<td>Removes any files which are located in a folder named dist</td>
				</tr>
				<tr>
					<td>assets/images/*.&#123;png,jpg&#125;</td>
					<td>Adds only png and jpg files</td>
				</tr>
			</tbody>
		</table>
	</section>

	<footer>
		<p>If you are not sure or your glob is correct checkout this <span onTouchTap={(e) => {shell.openExternal("http://www.globtester.com/")}}>glob-tester</span>.</p>
	</footer>
</article>);

export const projectsExplenation = (<article>
	<header>
		<h3>Workflow Projects</h3>
	</header>
	<section>
		<p>Each item in the list represents one of the projects that you are developing.</p>
	</section>

	<section>
		<h4>Build</h4>
		<p>Use this command to execute the active features (Sass, Javascript, etc) in production mode. This means the files will be ready for deployment.</p>
		<p>Please note that <em>cache bust and optimizing images will only run during the build task</em>.</p>
		<p>Just run this when you are ready to deploy a new version.</p>
	</section>

	<section>
		<h4>Start / Stop</h4>
		<p>Click on a list item to start or stop the workflow. This will toggle a server for your project. Please note that in case of a vagrant or docker project you first have to start those services. You can run multiple projects simultaneously</p>
	</section>

	<section>
		<h4>Add new project</h4>
		<p>Adding a new project is easy. You can start from a template, create a new setup or import and existing project.</p>
		<p>When a project is setup the <em>.workflowconfig</em> file is saved in the project root. This file is shared through git which makes it easy to share projects between developers. Just clone the repo and import the existing workflow project.</p>
	</section>
</article>);

export const onlineProjectsExplenation = (<article>
	<header>
		<h3>Online Workflow Projects</h3>
	</header>
	<section>
		<p>Running projects of other users will show up in this list. You can visit them by clicking on the item. When visiting the others project your clicks and scrolls <em>will not</em> be broadcasted to other users visiting or developing the project in question.</p>

		<p>Your own projects are filtered out from this list. No worries, the others will see them.</p>
	</section>
</article>);