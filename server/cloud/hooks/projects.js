"use strict";

const fs = require('fs-extra');
const slugify = require('slugify');

const { projectsImagesDir } = require('../../utils/constants');
const { isDirty, parseFunction } = require('../utils/utils');

/**
 * get the file
 * @param fileInput
 * @param slug
 * @returns {object}
 */
const getFile = async (fileInput, slug) => {
  const file = await Parse.Cloud.httpRequest({ url: fileInput.url() });
  const fileName = slug + '_' + fileInput.name();

  const fileType = file.headers['content-type'].split('/')[0];

  return { fileName, fileType, file };
}

/**
 * save / edit the files to disk
 */
Parse.Cloud.beforeSave('Project', 
	parseFunction(async request => {
		const project = request.object;

    const slug = slugify(project.get('name'));
    project.set('slug', slug);

    /** files deleted from disk */
    if (project.get('deleted')) {
      try {
        await fs.remove(projectsImagesDir + '/' + project.get('previewImageId'));
        if (project.has('imagesIds')) {
          for (const projectImage of project.get('imagesIds')) {
            await fs.remove(projectsImagesDir + '/' + projectImage);
          }
        }
      } catch (err) {
        console.error(err)
      }
      return;
    }

		/**
		 * save one image project
		 */
		if (isDirty(project, 'previewImage')) {
      const previewImage = project.get('previewImage');
      const { fileName, fileType, file } = await getFile(previewImage, slug);

      if (fileType === 'image') {
        try {
          /** when updating the project image, delete the old one */
          if (project.has('previewImageId')) {
            await fs.remove(projectsImagesDir + '/' + project.get('previewImageId'));
          }

          /** write file to disk */
          // create directory if not exist yet
          await fs.outputFile(projectsImagesDir + '/' + fileName, file.buffer);
        } catch (err) {
          console.error(err);
        }

        project.unset('previewImage');
        project.set('previewImageId', fileName);          
      }
    }

    // images
		if (isDirty(project, 'images')) {
      const images = project.get('images');
      const imagesIds = [];
      for (const image of images) {
        const { fileName, fileType, file } = await getFile(image, slug);
        if (fileType === 'image') {
          try {
            /** when updating the project image, delete the old one */
            if (project.has('imagesIds')) {
              for (const projectImage of project.get('imagesIds')) {
                await fs.remove(projectsImagesDir + '/' + projectImage);
              }
            }
  
            /** write file to disk */
            // create directory if not exist yet

            imagesIds.push(fileName);
            await fs.outputFile(projectsImagesDir + '/' + fileName, file.buffer);
          } catch (err) {
            console.error(err);
          }       
        }
      }
      project.unset('images');
      project.set('imagesIds', imagesIds);   
    }
	})
);