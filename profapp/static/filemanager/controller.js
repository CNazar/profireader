(function(window, angular, $) {
    "use strict";
    angular.module('FileManagerApp').controller('FileManagerCtrl', [
    '$scope', '$translate', '$cookies', '$timeout', 'fileManagerConfig', 'item', 'Upload', 'fileNavigator', 'fileUploader',
    function($scope, $translate, $cookies, $timeout, fileManagerConfig, Item, Upload, FileNavigator, fileUploader) {

        $scope.config = fileManagerConfig;
        $scope.appName = fileManagerConfig.appName;
        $scope.path_profireader = 'http://profireader.com';
        $scope.orderProp = ['model.type','model.name'];
        $scope.query = '';
        $scope.temp = new Item();
        $scope.fileNavigator = new FileNavigator(_.keys(library)[0], file_manager_called_for);
        $scope.fileUploader = fileUploader;
        $scope.uploadFileList = [];
        $scope.viewTemplate = $cookies.viewTemplate || 'main-table.html';
        $scope.error = error;
        $scope.rootdirs = library;
        $scope.file_manager_called_for = file_manager_called_for;
        $scope.file_manager_on_action = file_manager_on_action;
        $scope.root_id = '';
        $scope.root_name = '';
        $scope.copy_file_id = '';
        $scope.cut_file_id = '';
        $scope.timer = false;
        $scope.name = '';
        $scope.chunkSize = '128KB';

        $scope.setTemplate = function(name) {
            $scope.viewTemplate = $cookies.viewTemplate = name;
        };

        $scope.changeRoot = function (root_id, root_name) {
            $scope.fileNavigator.setRoot(root_id);
            $scope.root_name = root_name;
        };

        $scope.touch = function(item) {
            item = item instanceof Item ? item : new Item();
            item.revert && item.revert();
            $scope.temp = item;
        };

        $scope.smartClick = function(item) {
            if (item.isFolder()) {
                return $scope.fileNavigator.folderClick(item);
            }
            if (item.isImage()) {
                return item.preview();
            }
            if (item.isEditable()) {
                item.getContent();
                $scope.touch(item);
                $('#edit').modal('show');
                return;
            }
        };

        $scope.isInThisPath = function(path) {
            var currentPath = $scope.fileNavigator.currentPath.join('/');
            return currentPath.indexOf(path) !== -1;
        };

        $scope.edit = function(item) {
            item.edit(function() {
                $('#edit').modal('hide');
            });
        };

        $scope.changePermissions = function(item) {
            item.changePermissions(function() {
                $('#changepermissions').modal('hide');
            });
        };

        $scope.search = function(query){
            $scope.fileNavigator.search(query, $scope.fileNavigator.getCurrentFolder());
        };


        $scope.cut = function(item){
            $scope.cut_file_id = $cookies.cut_file_id = item.model.id;
            $scope.copy_file_id = $cookies.copy_file_id = '';
            item.cut(function() {
                $scope.fileNavigator.refresh();
            });
        };

        $scope.copy = function(item){
            $scope.copy_file_id = $cookies.copy_file_id = item.model.id;
            $scope.cut_file_id = $cookies.cut_file_id = '';
            item.copy(function() {
                $scope.fileNavigator.refresh();
            });
        };

        $scope.time_out = function(){
            $scope.timer = True;
            $timeout(function() {
                $scope.timer = False
            }, 2000);
        };


        $scope.paste = function(item) {
            if($scope.copy_file_id !== '' && $scope.cut_file_id === ''){
                item.tempModel.mode = 'copy';
                item.tempModel.id = $scope.copy_file_id;
                item.tempModel.error = $translate.instant('error_copy');
            }else if($scope.copy_file_id == '' && $scope.cut_file_id != ''){
                item.tempModel.mode = 'cut';
                item.tempModel.id = $scope.cut_file_id;
                item.tempModel.error = $translate.instant('error_cut');
            }
            item.tempModel.len = $scope.fileNavigator.fileList.length;
            item.tempModel.time_o = $scope.time_out();
            item.tempModel.folder_id = $scope.fileNavigator.getCurrentFolder();
            item.paste(function() {
                    $scope.fileNavigator.refresh();
                    $scope.cut_file_id = $cookies.cut_file_id = '';
                    $scope.copy_file_id = $cookies.copy_file_id = ''
                });
        };

        $scope.compress = function(item) {
            item.compress(function() {
                item.success = true;
                $scope.fileNavigator.refresh();
            }, function() {
                item.success = false;
            });
        };

        $scope.extract = function(item) {
            item.extract(function() {
                item.success = true;
                $scope.fileNavigator.refresh();
            }, function() {
                item.success = false;
            });
        };

        $scope.remove = function(item) {
            item.tempModel.error = $translate.instant('error_remove');
            item.remove(function() {
                $scope.fileNavigator.refresh();
                $('#remove').modal('hide');
            });
        };

        $scope.set_property = function(item){
            if ($scope.fileNavigator.fileNameExists(item.tempModel.name) && item.tempModel.name.trim() !== item.model.name.trim()) {
                item.error = $translate.instant('error_invalid_filename');
                return false;
            }
            item.set_properties(function() {
                $scope.fileNavigator.refresh();
                $('#properties').modal('hide');
            });
        };


        $scope.createFolder = function(item) {
            var name = item.tempModel.name && item.tempModel.name.trim();
            item.tempModel.type = 'dir';
            item.tempModel.path = $scope.fileNavigator.currentPath;
            item.tempModel.root_id = $scope.fileNavigator.root_id;
            item.tempModel.folder_id = $scope.fileNavigator.getCurrentFolder();

            if (name && !$scope.fileNavigator.fileNameExists(name)) {
                item.createFolder(function() {
                    $scope.fileNavigator.refresh();
                    $('#newfolder').modal('hide');
                });
            } else {
                $scope.temp.error = $translate.instant('error_invalid_filename');
                return false;
            }
        };

        $scope.take_action = function(item, actionname) {
            $scope.modal = '';
            if ($scope.file_manager_on_action[actionname] !== '' &&  actionname === 'download') {
                try {
                    eval('item'+'.'+actionname+'();');//$scope.file_manager_on_action[actionname] + '(item);');
                }
                catch(e) {

                }
            }else if ($scope.file_manager_on_action[actionname] !== '' &&  actionname === 'choose') {
                try {
                    eval($scope.file_manager_on_action[actionname] + '(item.model);');
                }
                catch(e) {

                }
            }else if($scope.file_manager_on_action[actionname] !== ''){
                eval('$scope.' + actionname.toString()+'(item)');//$scope.file_manager_on_action[actionname] + '(item);');
            }
        };

        $scope.can_action = function(item, actionname, defaultpermited) {
            if (actionname === 'paste') {
                if (defaultpermited === true) {
                    return ($scope.copied_files.length > 0)
                }
            }
            return defaultpermited
            };

        $scope.uploadUsingUpload=function() {
            var file = $scope.uploadFileList[0];
            var re = '^video/.*';
            $scope.f = file;
            var ext = $scope.f.type.match(re);
            if(ext){
                var url = '/filemanager/send/' + $scope.fileNavigator.getCurrentFolder() + '/'
            }else{
                var url = '/filemanager/upload/' + $scope.fileNavigator.getCurrentFolder() + '/'
            }
            console.log(file.type);
            file.upload = Upload.upload({url: url,
                data: $scope.name,
                resumeSizeUrl: '/filemanager/resumeopload/',
                resumeChunkSize: $scope.chunkSize,
                ftype: $scope.f.type,
                headers: {
                    'optional-header': 'header-value'
                },
                fields: {username: $scope.username},
                file: file
            });
            file.upload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            }).success(function () {
                    $scope.fileNavigator.refresh();
                    $('#uploadfile').modal('hide');
                }).error(function (data) {
                    var errorMsg = data.result && data.result.error || $translate.instant('error_uploading_files');
                    $scope.temp.error = errorMsg;
                });

        };

        //$scope.uploadFiles = function() {
        //    var file = $scope.uploadFileList[0];
        //    $scope.f = file;
        //    console.log(file);
        //    file.upload = Upload.upload({
        //        url: $scope.config.uploadUrl,
        //        data : $scope.name,
        //        resumeSizeUrl: '/filemanager/resumeopload/',
        //        resumeChunkSize: $scope.chunkSize,
        //        root_id: $scope.fileNavigator.root_id,
        //        parent_id: $scope.fileNavigator.getCurrentFolder(),
        //        headers: {
        //            'optional-header': 'header-value'
        //        },
        //        fields: {username: $scope.username},
        //        file: file});
        //                file.upload.progress(function (evt) {
        //                file.progress = Math.min(100, parseInt(100.0 *
        //                                                       evt.loaded / evt.total));
        //            });
        //    //$scope.fileUploader.upload($scope.uploadFileList, $scope.fileNavigator.currentPath,
        //    //    $scope.fileNavigator.root_id, $scope.fileNavigator.getCurrentFolder()).success(function () {
        //    //        $scope.fileNavigator.refresh();
        //    //        $('#uploadfile').modal('hide');
        //    //    }).error(function (data) {
        //    //        var errorMsg = data.result && data.result.error || $translate.instant('error_uploading_files');
        //    //        $scope.temp.error = errorMsg;
        //    //    });
        //};


        $scope.getQueryParam = function(param) {
            var found;
            window.location.search.substr(1).split("&").forEach(function(item) {
                if (param ===  item.split("=")[0]) {
                    found = item.split("=")[1];
                    return false;
                }
            });
            return found;
        };
        $scope.isDisable = function(actionname,len, type){
            if(actionname === 'paste' && ($scope.copy_file_id != '' || $scope.cut_file_id != '') && type === 'parent'){
                return ''
            }else if(($scope.copy_file_id == '' && $scope.cut_file_id == '') && len < 2){
                return 'cursor: default;pointer-events: none;color: gainsboro;'
            }else if((actionname !== 'paste' && ($scope.copy_file_id != '' || $scope.cut_file_id != '')) && len < 2 || type === 'parent') {
                return 'cursor: default;pointer-events: none;color: gainsboro;'
            }else if(actionname === 'paste' && ($scope.copy_file_id == '' && $scope.cut_file_id == '')){
                return 'cursor: default;pointer-events: none;color: gainsboro;'
            }else{
                return ''
            }
        };

        $scope.isModal = function(actionname){
          if (actionname === 'rename' || actionname === 'remove' || actionname === 'properties'){
              return true
          }
        };

        $scope.glyph = function(actionname){
          if(actionname == 'rename'){
              return 'edit'
          }else if(actionname == 'cut'){
              return 'scissors'
          }else if(actionname == 'properties'){
                return 'wrench'
          }else{
              return actionname
          }
        };

        $scope.err = function(){
            if($scope.error == 'False' && $scope.rootdirs.length != 0){
                return false
            }else{
                return true
            }
        };

        $scope.changeRoots = function(){
            if(error == 'False'){
                $scope.changeRoot(_.keys($scope.rootdirs)[0], _.values($scope.rootdirs)[0]['name'])
            }else{
                $scope.changeRoot('','')
            }
        };

        $scope.errMsg = "You do not belong to any company!";
        $scope.changeRoots();//(_.keys($scope.rootdirs)[0], _.values($scope.rootdirs)[0]['name']);
        $scope.isWindows = $scope.getQueryParam('server') === 'Windows';
        $scope.fileNavigator.refresh();

    }]);
})(window, angular, jQuery);
