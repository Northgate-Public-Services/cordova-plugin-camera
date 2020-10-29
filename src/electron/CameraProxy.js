/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
const fs = global.require('fs');
const os = global.require('os');
// https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/index.html
function takePicture(success, error, opts) {
    // @TODO 
    opts = {
        quality: opts[0],
        destinationType: opts[1], // DATA_URL: 0, FILE_URI: 1, NATIVE_URI: 2
        sourceType: opts[2], // PHOTOLIBRARY: 0, CAMERA: 1, SAVEDPHOTOALBUM: 2
        targetWidth: opts[3],
        targetHeight: opts[4],
        encodingType: opts[5], // JPEG: 0, PNG: 1
        mediaType: opts[6], //PICTURE: 0, VIDEO: 1, ALLMEDIA: 2
        allowEdit: opts[7],
        correctOrientation: opts[8],
        saveToPhotoAlbum: opts[9],
        popoverOptions: opts[10],
        cameraDirection: opts[11] // BACK: 0, FRONT: 1
    };
    //console.log(opts);
    var cameraWindow = cordova.InAppBrowser.open('plugins/cordova-plugin-camera/www/electron/index.html', 'cameraWindow', '');
    var pictureSet = setInterval(function() {
        if (sessionStorage.getItem('cordova-plugin-camera-picture-isset') === 'true') {
            clearInterval(pictureSet);
            sessionStorage.removeItem('cordova-plugin-camera-picture-isset');
            cameraWindow.close();
            let ret = sessionStorage.getItem('cordova-plugin-camera-picture-base64');
            sessionStorage.removeItem('cordova-plugin-camera-picture-base64');
            switch (opts.destinationType) {
                case 0: //DATA_URL
                default:
                    break;

                case 1: //FILE_URI
                    //@TODO
                    break;

                case 2: //NATIVE_URI
                    let tempFileName = os.tmpdir() + '/cdvcm-' + new Date().valueOf() + '.png';
                    fs.writeFileSync(tempFileName, ret, 'base64');
                    console.log('Saved image to:', tempFileName);
                    ret = tempFileName;
                    break;
            }
            success(ret);
        }
    }, 100);
}

module.exports = {
    takePicture: takePicture,
    cleanup: function() {}
};

require('cordova/exec/proxy').add('Camera', module.exports);