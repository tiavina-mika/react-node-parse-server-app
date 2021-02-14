"use strict";

const fs = require('fs-extra');
const path = require('path');
const { projectsImagesDir } = require('../../utils/constants');
const { isDirty, parseFunction } = require('../utils/utils');

const imagesDir = '../../public/images';
/**
 * save / edit the files to GCS's bucket
 */
Parse.Cloud.beforeSave('Project', 
	parseFunction(async request => {
		const project = request.object;

    /** file deleted from disk */
    if (project.get('deleted')) {
      try {
        await fs.remove(projectsImagesDir + '/' + project.get('previewImageId'));
      } catch (err) {
        console.error(err)
      }
    }

		/**
		 * save image project
		 */
		if (isDirty(project, 'previewImage')) {
      const previewImage = project.get('previewImage');
      const file = await Parse.Cloud.httpRequest({ url: previewImage.url() });
      const fileName = project.get('name') + previewImage.name();

      const fileType = file.headers['content-type'].split('/')[0];

      if (fileType === 'image') {
        /** write file to disk */
        // create directory if not exist yet
        await fs.outputFile(projectsImagesDir + '/' + fileName, file.buffer);

        project.unset('previewImage');
        project.set('previewImageId', fileName);          
      }
    }
	})
);