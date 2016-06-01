current-folder-breadcrumb.html
<ol class="breadcrumb mb0">\n    <li>\n\n        <a href="" ng-click="fileNavigator.goTo(-1)">\n            <i class="glyphicon glyphicon-folder-open mr2"></i>\n        </a>\n    </li>\n    <li ng-repeat="(key, dir) in fileNavigator.currentPath track by key" ng-class="{\'active\':$last}" class="animated fast fadeIn">\n        <a href="" ng-show="!$last" ng-click="fileNavigator.goTo(key)">\n            <i class="glyphicon glyphicon-folder-open mr2"></i> {{dir}}\n        </a>\n        <span ng-show="$last"><i class="glyphicon glyphicon-folder-open mr2"></i>  {{dir}}</span>\n    </li>\n    <li><button class="btn btn-primary btn-xs" ng-click="fileNavigator.upDir()">&crarr;</button></li>\n</ol>\n\n
index.html
<div ng-controller="FileManagerCtrl" class='container'>\n    <div ng-include="config.tplPath + \'/navbar.html\'" ng-if="!err()" class='fmnav'></div>\n    <div class="error" ng-show="err()"><h1 align="center">{{errMsg}}</h1></div>\n    <div ng-bind="id"></div>\n    <div class="container-fluid" ng-if="!err()">\n        <div class="row">\n\n            <div class="col-sm-3 col-md-2 sidebar file-tree animated slow fadeIn" ng-include="config.tplPath + \'/sidebar.html\'" ng-show="config.sidebar && fileNavigator.history[0]"></div>\n            <div class="main" ng-class="config.sidebar && fileNavigator.history[0] && \'col-sm-offset-3 col-md-offset-2\'">\n                <div ng-include="config.tplPath + \'/current-folder-breadcrumb.html\'" ng-show="config.breadcrumb"></div>\n                <div ng-include="config.tplPath + \'/\' + viewTemplate" class="main-navigation clearfix"></div>\n            </div>\n        </div>\n    </div>\n\n    <div ng-include="config.tplPath + \'/modals.html\'" ></div>\n    <div ng-include="config.tplPath + \'/item-context-menu.html\'" ></div>\n</div>\n\n
item-context-menu.html
<div id="context-menu" class="dropdown clearfix animated fast fadeIn">\n    <ul class="dropdown-menu dropdown-right-click" role="menu" aria-labelledby="dropdownMenu" style="">\n        <li ng-class="{\'disabled\': (permitted !== true )}" ng-repeat="(actionname, permitted) in temp.model.actions">\n            <a ng-style="can_action(temp.model, actionname, permitted)" href="" tabindex="-1" ng-if="!isModal(actionname)" ng-click="take_action(temp, actionname, permitted)" style="{{isDisable(actionname,fileNavigator.fileList.length, temp.model.type)}}"><i\n                class="glyphicon glyphicon-{{ glyph(actionname) }}"></i>{{_(actionname)}}</a>\n            <a href="" tabindex="-1" ng-if="isModal(actionname)" data-toggle="modal" data-target="#{{permitted === true?actionname:''}}" style="{{isDisable(actionname,fileNavigator.fileList.length, temp.model.type)}}"><i\n                class="glyphicon glyphicon-{{ glyph(actionname) }}"></i>{{_(actionname)}}</a>\n        </li>\n        <!--<li ng-show="config.allowedActions.rename"><a href="" tabindex="-1" data-toggle="modal" data-target="#rename"><i class="glyphicon glyphicon-edit"></i> {{\'rename\' | " +
    "}}</a></li>-->\n        <!--<li ng-show="config.allowedActions.copy "><a href="" tabindex="-1" ng-click="copy(temp)"><i class="glyphicon glyphicon-duplicate"></i> {{ _('copy') }}</a></li>-->\n        <!--<li ng-show="config.allowedActions.copy "><a href="" tabindex="-1" ng-click="cut(temp)"><i class="glyphicon glyphicon-scissors"></i> {{ _('cut') }}</a></li>-->\n        <!--<li ng-show="config.allowedActions.copy "><a href="" tabindex="-1" style="{{isDisable()}}" ng-click="paste(temp)"><i class="glyphicon glyphicon-log-in"></i> {{ _('paste') }}</a></li>-->\n        <!--<li ng-show="config.allowedActions.edit && temp.isEditable()"><a href="" tabindex="-1" data-toggle="modal" data-target="#edit" ng-click="temp.getContent();"><i class="glyphicon glyphicon-pencil"></i> {{ _('edit') }}</a></li>-->\n        <!--<li ng-show="config.allowedActions.changePermissions"><a href="" tabindex="-1" data-toggle="modal" data-target="#changepermissions"><i class="glyphicon glyphicon-lock"></i> {{ _('permissions') }}</a></li>-->\n        <!--<li ng-show="config.allowedActions.compress && temp.isCompressible()"><a href="" tabindex="-1" data-toggle="modal" data-target="#compress"><i class="glyphicon glyphicon-compressed"></i> {{ _('compress') }}</a></li>-->\n        <!--<li ng-show="config.allowedActions.extract && temp.isExtractable()"><a href="" tabindex="-1" data-toggle="modal" data-target="#extract" ng-click="temp.tempModel.name=\'\'"><i class="glyphicon glyphicon-export"></i> {{ _('extract') }}</a></li>-->\n        <!--<li ng-show="config.allowedActions.download && !temp.isFolder()"><a href="" tabindex="-1" ng-click="temp.download()"><i class="glyphicon glyphicon-download"></i> {{ _('download') }}</a></li>-->\n        <!--<li ng-show="config.allowedActions.preview && temp.isImage()"><a href="" tabindex="-1" ng-click="temp.preview()"><i class="glyphicon glyphicon-picture"></i> {{ _('view_item') }}</a></li>-->\n        <!--<li ng-show="config.allowedActions.choose && temp.actionAllowed(\'choose\')"><a href="" tabindex="-1" ng-click="temp.choose()"><i class="glyphicon glyphicon-check"></i> {{ _('choose_item') }}</a></li>-->\n        <!--&lt;!&ndash;<li class="divider"></li>&ndash;&gt;-->\n        <!--<li ng-show="config.allowedActions.remove"><a href="" tabindex="-1" data-toggle="modal" data-target="#delete"><i class="glyphicon glyphicon-trash"></i> {{ _('remove') }}</a></li>-->\n    </ul>\n</div>\n\n
item-toolbar.html
<div ng-show="!item.inprocess">\n    <button class="btn btn-sm btn-default" data-toggle="modal" data-target="#rename" ng-show="config.allowedActions.rename" ng-click="touch(item)" title="{{ _('rename') }}">\n        <i class="glyphicon glyphicon-edit"></i>\n    </button>\n    <!--<button class="btn btn-sm btn-default" data-toggle="modal" data-target="#copy" ng-show="config.allowedActions.copy && !item.isFolder()" ng-click="touch(item)" title="{{ _('copy') }}">-->\n        <!--<i class="glyphicon glyphicon-log-out"></i>-->\n    <!--</button>-->\n    <button class="btn btn-sm btn-default" data-toggle="modal" data-target="#edit" ng-show="config.allowedActions.edit && item.isEditable()" ng-click="item.getContent(); touch(item)" title="{{ _('edit') }}">\n        <i class="glyphicon glyphicon-pencil"></i>\n    </button>\n    <button class="btn btn-sm btn-default" data-toggle="modal" data-target="#changepermissions" ng-show="config.allowedActions.changePermissions" ng-click="touch(item)" title="{{ _('permissions') }}">\n        <i class="glyphicon glyphicon-lock"></i>\n    </button>\n    <button class="btn btn-sm btn-default" data-toggle="modal" data-target="#compress" ng-show="config.allowedActions.compress && item.isCompressible()" ng-click="touch(item)" title="{{ _('compress') }}">\n        <i class="glyphicon glyphicon-compressed"></i>\n    </button>\n    <button class="btn btn-sm btn-default" data-toggle="modal" data-target="#extract" ng-show="config.allowedActions.extract && item.isExtractable()" ng-click="touch(item); item.tempModel.name=\'\'" title="{{ _('extract') }}">\n        <i class="glyphicon glyphicon-export"></i>\n    </button>\n    <button class="btn btn-sm btn-default" ng-show="(config.allowedActions.download && !item.isFolder()) && item.model.type !== \'file_video\'" ng-click="item.download()" title="{{ _('download') }}">\n        <i class="glyphicon glyphicon-cloud-download"></i>\n    </button>\n    <button class="btn btn-sm btn-default" ng-show="config.allowedActions.preview && item.isImage()" ng-click="item.preview()" title="{{ _('view_item') }}">\n        <i class="glyphicon glyphicon-picture"></i>\n    </button>\n    <button ng-disabled="item.model.actions.remove !== true" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#remove" ng-show="config.allowedActions.remove" ng-click="touch(item)" title="{{ item.model.actions.remove !== true?_(item.model.actions.remove):'remove' }}">\n        <i class="glyphicon glyphicon-trash"></i>\n    </button>\n</div>\n<div ng-show="item.inprocess">\n    <button class="btn btn-sm" style="visibility: hidden">&nbsp;</button><span class="label label-warning">{{ _('wait') }} ...</span>\n</div>\n\n
main-icons.html
<h3 ng-show="fileNavigator.is_search" style="text-align: center">{{fileNavigator.search_len === 0? _(\'Search returned no result\'):_(\'Search result\')}}</h3>\n<div class="iconset clearfix" style="padding-bottom: 0;height: 80px" ng-hide="fileNavigator.is_search && fileNavigator.search_len === 0">\n    <div class="col-120" style="margin-bottom:0" ng-repeat="item in fileNavigator.list | filter: query | orderBy: orderProp" ng-show="!fileNavigator.requesting && !fileNavigator.error && item.model.type !== \'parent\'">\n        <a href="" class="thumbnail text-center" ng-click="smartClick(item)" ng-right-click="touch(item)" title="{{item.title()}}">\n            <div class="item-icon">\n                <i class="glyphicon glyphicon-folder-open" ng-show="item.model.type === \'dir\'"></i>\n                <i class="glyphicon glyphicon-facetime-video" style="width: 32px;height: 32px" ng-show="item.model.type === \'file_video\'"></i>\n             <i class="glyphicon glyphicon-book" style="width: 32px;height: 32px" ng-show="item.model.type === \'fpdf\'"></i>\n            <i class="glyphicon glyphicon-file" style="width: 32px;height: 32px"  ng-show="item.model.type === \'file\'"></i>\n                <img class="img-thumbnails" style="width: 32px;height: 32px" ng-src="{{item.model.url}}" ng-if="item.model.type === \'img\'">\n            </div>\n            <span id=\'highlightT_{{item.model.id}}\'>{{getTitle(item.model.name, item.model.id, 11)}}</span>\n        </a>\n    </div>\n\n    <div ng-show="!fileNavigator.requesting && !fileNavigator.error && fileNavigator.parent().model.type === \'parent\'" ng-if="!fileNavigator.is_search">\n        <a style="width: inherit; padding: 45px!important;" href="" class="thumbnail text-center" ng-click="smartClick(fileNavigator.parent())" ng-right-click="touch(fileNavigator.parent())" title="">\n\n        </a>\n    </div>\n\n<a ng-show="!fileNavigator.requesting && fileNavigator.fileList.length === 1 && !fileNavigator.error" style="width: inherit;text-decoration: none;color: black" href="" class="thumbnail text-center" ng-click="smartClick(fileNavigator.parent())" ng-right-click="touch(fileNavigator.parent())" title="">\n\n  {{ _('no_files_in_folder') }}...\n  </a>  <a ng-show="!fileNavigator.requesting && !fileNavigator.error && fileNavigator.parent().model.type === \'parent\'" ng-if="!fileNavigator.is_search" style="width: 100%; height: 450px;padding: 0" href="" class="thumbnail text-center" ng-click="smartClick(fileNavigator.parent())" ng-right-click="touch(fileNavigator.parent())" title="">\n\n      </a>\n    <span ng-if="!fileNavigator.is_search"><hr></span>     <div ng-show="fileNavigator.requesting">\n        <div ng-include="config.tplPath + \'/spinner.html\'"></div>\n    </div>\n\n       <div ng-show="fileNavigator.fileList.length > 0">\n    </div>\n    \n    <div class="alert alert-danger" ng-show="!fileNavigator.requesting && fileNavigator.error">\n        {{ fileNavigator.error }}\n\n\n
main-table-modal.html
<table class="table table-condensed table-modal-condensed mb0">\n    <thead>\n        <tr>\n            <th>{{ _('name') }}</th>\n            <th class="text-right"></th>\n        </tr>\n    </thead>\n    <tbody class="file-item">\n        <tr ng-show="fileNavigator.requesting">\n            <td colspan="2">\n                <div ng-include="config.tplPath + \'/spinner.html\'"></div>\n            </td>\n        </tr>\n        <tr ng-show="!fileNavigator.requesting && !fileNavigator.listHasFolders() && !fileNavigator.error">\n            <td colspan="2">\n                {{ _('no_folders_in_folder') }}...\n            </td>\n            <td class="text-right">\n                <button class="btn btn-sm btn-default" ng-click="fileNavigator.upDir()">{{ _('go_back') }}</button>\n            </td>\n        </tr>\n        <tr ng-show="!fileNavigator.requesting && fileNavigator.error">\n            <td colspan="2">\n                {{ fileNavigator.error }}\n            </td>\n        </tr>\n        <tr ng-repeat="item in fileNavigator.fileList | orderBy: orderProp" ng-show="!fileNavigator.requesting && item.model.type === \'dir\'">\n            <td>\n                <a href="" ng-click="fileNavigator.folderClick(item)" title="{{item.model.name}} ({{item.model.sizeKb()}}kb)">\n                    <i class="glyphicon glyphicon-folder-close"></i>\n                    {{item.model.name | strLimit : 32}}\n                </a>\n            </td>\n            <td class="text-right">\n                <button class="btn btn-sm btn-default" ng-click="select(item, temp)">\n                    <i class="glyphicon glyphicon-hand-up"></i> {{ _('select_this') }}\n                </button>\n            </td>\n        </tr>\n    </tbody>\n</table>\n\n
main-table.html
<h3 ng-show="fileNavigator.is_search === true" style="text-align: center">{{fileNavigator.search_len === 0? \'Search returned no result\':\'Search result\'}}</h3>\n<table class="table mb0 table-files">\n    <thead ng-hide="fileNavigator.is_search === true && fileNavigator.searchList.length === 0">\n        <tr>\n            <th>{{ _('name') }}</th>\n            <th class="hidden-xs">{{ _('size') }}</th>\n            <th class="hidden-sm hidden-xs">{{ _('date') }}</th>\n            <!--<th class="hidden-sm hidden-xs">{{ _('permissions') }}</th>-->\n            <th class="text-right"></th>\n        </tr>\n    </thead>\n    <tbody class="file-item" ng-hide="fileNavigator.is_search && fileNavigator.search_len === 0">\n        <tr ng-show="fileNavigator.requesting">\n            <td colspan="5">\n                <div ng-include="config.tplPath + \'/spinner.html\'"></div>\n            </td>\n        </tr>\n        <tr style=\'height: 400px\' ng-show="!fileNavigator.requesting && fileNavigator.fileList.length === 1 && !fileNavigator.error">\n            <td colspan="5">\n                {{ _('no_files_in_folder') }}...\n            </td>\n        </tr>\n        <tr ng-show="!fileNavigator.requesting && fileNavigator.error">\n            <td colspan="5">\n                {{ fileNavigator.error }}\n            </td>\n        </tr>\n        <tr ng-show="temp.error" style="color: red"  ng-if="timer">\n            <td colspan="5">\n                <div class="label label-danger error-msg pull-left animated fadeIn">\n                    <i class="glyphicon glyphicon-remove-circle"></i> {{temp.error}}\n                </div>\n            </td>\n        </tr>\n        <tr ng-repeat="item in fileNavigator.list | orderBy: orderProp" ng-show="!fileNavigator.requesting" >\n            <td ng-right-click="touch(item)" ng-if="item.model.type !== \'parent\'">\n                <a href="" ng-click="smartClick(item)" title="{{item.title()}}">\n                    <i class="glyphicon glyphicon-folder-close" ng-show="item.model.type === \'dir\'"></i>\n                    <i class="glyphicon glyphicon-file" ng-show="item.model.type !== \'dir\'"></i>\n                    <span id=\'highlightT_{{item.model.id}}\'>{{getTitle(item.model.name, item.model.id, 64)}}</span>\n                </a>\n            </td>\n            <td class="hidden-xs" ng-if="item.model.type !== \'parent\'">\n                {{item.isFolder()?\'------\':item.model.sizeKb()+\'kb\'}}\n            </td>\n            <td class="hidden-sm hidden-xs" ng-if="item.model.type !== \'parent\'">\n                {{item.model.date | formatDate }}\n            </td>\n            <!--<td class="hidden-sm hidden-xs">-->\n                <!--{{item.model.perms.toCode(item.model.type === \'dir\'?\'d\':\'-\')}}-->\n            <!--</td>-->\n            <td class="text-right" ng-if="item.model.type !== \'parent\'">\n                <div ng-include="config.tplPath + \'/item-toolbar.html\'"></div>\n            </td>\n            <td style="padding-bottom: 250px;" ng-right-click="touch(item)" ng-if="item.model.type === \'parent\'" ng-show="!fileNavigator.requesting && fileNavigator.fileList.length > 1 && !fileNavigator.error">\n                    {{ _('folder_area') }}\n            </td>\n        </tr>\n    </tbody>\n</table>\n\n
modals.html
<div class="modal animated fadeIn" id="remove">\n  <div class="modal-dialog">\n    <div class="modal-content">\n    <form ng-submit="remove(temp)">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal">\n            <span aria-hidden="true">&times;</span>\n            <span class="sr-only">{{ _('close') }}</span>\n        </button>\n        <h4 class="modal-title">{{ _('confirm') }}</h4>\n      </div>\n      <div class="modal-body">\n        {{ _('sure_to_delete') }} <b>{{temp.model.name}}</b> ?\n        <div ng-include data-src="\'error-bar\'" class="clearfix"></div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal" ng-disabled="temp.inprocess">{{ _('cancel') }}</button>\n        <button type="submit" class="btn btn-primary" ng-disabled="temp.inprocess" autofocus="autofocus">{{ _('remove') }}</button>\n      </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n<div class="modal animated fadeIn" id="rename">\n  <div class="modal-dialog">\n    <div class="modal-content">\n        <form ng-submit="rename(temp)">\n            <div class="modal-header">\n              <button type="button" class="close" data-dismiss="modal">\n                  <span aria-hidden="true">&times;</span>\n                  <span class="sr-only">{{ _('close') }}</span>\n              </button>\n              <h4 class="modal-title">{{ _('change_name_move') }}</h4>\n            </div>\n            <div class="modal-body">\n              <label class="radio">{{ _('enter_new_name_for') }} <b>{{temp.model.name}}</b></label>\n              <input class="form-control" ng-model="temp.tempModel.name" autofocus="autofocus">\n\n              <div ng-include data-src="\'path-selector\'" class="clearfix"></div>\n              <div ng-include data-src="\'error-bar\'" class="clearfix"></div>\n            </div>\n            <div class="modal-footer">\n              <button type="button" class="btn btn-default" data-dismiss="modal" ng-disabled="temp.inprocess">{{ _('cancel') }}</button>\n              <button type="submit" class="btn btn-primary" ng-disabled="temp.inprocess">{{ _('rename') }}</button>\n            </div>\n        </form>\n    </div>\n  </div>\n</div>\n\n<div class="modal animated fadeIn" id="properties">\n  <div class="modal-dialog">\n    <div class="modal-content">\n        <form ng-submit="set_property(temp)">\n            <div class="modal-header">\n              <button type="button" class="close" data-dismiss="modal">\n                  <span aria-hidden="true">&times;</span>\n                  <span class="sr-only">{{ _('close') }}</span>\n              </button>\n              <h4 class="modal-title">{{ _('change_properties') }}</h4>\n            </div>\n            <div class="modal-body">\n              <label class="radio">{{ _('enter_new_name_for') }} <b>{{temp.model.name}}</b></label>\n              <input class="form-control" ng-model="temp.tempModel.name" autofocus="autofocus">\n              <div ng-include data-src="\'error-bar\'" class="clearfix"></div>\n                <label class="radio" ng-if="temp.model.type !== 'dir' && temp.model.type !== 'parent'">{{ _('link') }}</label>\n              <input ng-if="temp.model.type !== 'dir' && temp.model.type !== 'parent'" class="form-control" autofocus="autofocus" value="{{temp.model.file_url}}" readonly>\n                <label class="radio">{{ _('enter_author_name') }}</label>\n              <input class="form-control" ng-model="temp.tempModel.author_name" autofocus="autofocus">\n                <label class="radio">{{ _('enter_description') }}</label>\n              <textarea style="height: 100px" class="form-control" ng-model="temp.tempModel.description">{{temp.model.description}}</textarea>\n                <span ng-if="temp.isFolder()">\n                    <input type="checkbox" ng-model="temp.tempModel.add_all" autofocus="autofocus" >add_properties_for_all_file_in_directory\n                </span>\n            </div>\n            <div class="modal-footer">\n              <button type="button" class="btn btn-default" data-dismiss="modal" ng-disabled="temp.inprocess">{{ _('cancel') }}</button>\n              <button type="submit" class="btn btn-primary" ng-disabled="temp.inprocess">{{ _('save') }}</button>\n            </div>\n        </form>\n    </div>\n  </div>\n</div>\n\n<div class="modal animated fadeIn" id="copy">\n  <div class="modal-dialog">\n    <div class="modal-content">\n        <form ng-submit="copy(temp)">\n            <!--<div class="modal-header">-->\n              <!--<button type="button" class="close" data-dismiss="modal">-->\n                  <!--<span aria-hidden="true">&times;</span>-->\n                  <!--<span class="sr-only">{{ _('close') }}</span>-->\n              <!--</button>-->\n              <!--<h4 class="modal-title">{{ _('copy_file') }}</h4>-->\n            <!--</div>-->\n            <!--<div class="modal-body">-->\n              <!--<label class="radio">{{ _('enter_new_name_for') }} <b>{{temp.model.name}}</b></label>-->\n              <!--<input class="form-control" ng-model="temp.tempModel.name" autofocus="autofocus">-->\n\n              <!--<div ng-include data-src="\'path-selector\'" class="clearfix"></div>-->\n              <!--<div ng-include data-src="\'error-bar\'" class="clearfix"></div>-->\n            <!--</div>-->\n            <!--<div class="modal-footer">-->\n              <!--<button type="button" class="btn btn-default" data-dismiss="modal" ng-disabled="temp.inprocess">{{ _('cancel') }}</button>-->\n              <button type="submit" class="btn btn-primary" ng-disabled="temp.inprocess">Copy</button>\n            <!--</div>-->\n        </form>\n    </div>\n  </div>\n</div>\n\n<div class="modal animated fadeIn" id="compress">\n  <div class="modal-dialog">\n    <div class="modal-content">\n        <form ng-submit="compress(temp)">\n            <div class="modal-header">\n              <button type="button" class="close" data-dismiss="modal">\n                  <span aria-hidden="true">&times;</span>\n                  <span class="sr-only">{{ _('close') }}</span>\n              </button>\n              <h4 class="modal-title">{{ _('compress') }}</h4>\n            </div>\n            <div class="modal-body">\n              <div ng-show="temp.success">\n                  <div class="label label-success error-msg">{{ _('compression_started') }}</div>\n              </div>\n              <div ng-hide="temp.success">\n                  <div ng-hide="config.allowedActions.compressChooseName">\n                    {{ _('sure_to_start_compression_with') }} <b>{{temp.model.name}}</b> ?\n                  </div>\n                  <div ng-show="config.allowedActions.compressChooseName">\n                    <label class="radio">{{ _('enter_folder_name_for_compression') }} <b>{{fileNavigator.currentPath.join(\'/\')}}/{{temp.model.name}}</b></label>\n                    <input class="form-control" ng-model="temp.tempModel.name" autofocus="autofocus">\n                  </div>\n              </div>\n\n              <div ng-include data-src="\'error-bar\'" class="clearfix"></div>\n            </div>\n            <div class="modal-footer">\n              <div ng-show="temp.success">\n                  <button type="button" class="btn btn-default" data-dismiss="modal" ng-disabled="temp.inprocess">{{ _('close') }}</button>\n              </div>\n              <div ng-hide="temp.success">\n                  <button type="button" class="btn btn-default" data-dismiss="modal" ng-disabled="temp.inprocess">{{ _('cancel') }}</button>\n                  <button type="submit" class="btn btn-primary" ng-disabled="temp.inprocess">{{ _('compress') }}</button>\n              </div>\n            </div>\n        </form>\n    </div>\n  </div>\n</div>\n\n<div class="modal animated fadeIn" id="extract" ng-init="temp.emptyName()">\n  <div class="modal-dialog">\n    <div class="modal-content">\n        <form ng-submit="extract(temp)">\n            <div class="modal-header">\n              <button type="button" class="close" data-dismiss="modal">\n                  <span aria-hidden="true">&times;</span>\n                  <span class="sr-only">{{ _('close') }}</span>\n              </button>\n              <h4 class="modal-title">{{ _('extract_item') }}</h4>\n            </div>\n            <div class="modal-body">\n              <div ng-show="temp.success">\n                  <div class="label label-success error-msg">{{ _('extraction_started') }}</div>\n              </div>\n              <div ng-hide="temp.success">\n                  <label class="radio">{{ _('enter_folder_name_for_extraction') }} <b>{{temp.model.name}}</b></label>\n                  <input class="form-control" ng-model="temp.tempModel.name" autofocus="autofocus">\n                  <div ng-include data-src="\'path-selector\'" class="clearfix"></div>\n              </div>\n              <div ng-include data-src="\'error-bar\'" class="clearfix"></div>\n            </div>\n            <div class="modal-footer">\n              <div ng-show="temp.success">\n                  <button type="button" class="btn btn-default" data-dismiss="modal" ng-disabled="temp.inprocess">{{ _('close') }}</button>\n              </div>\n              <div ng-hide="temp.success">\n                  <button type="button" class="btn btn-default" data-dismiss="modal" ng-disabled="temp.inprocess">{{ _('cancel') }}</button>\n                  <button type="submit" class="btn btn-primary" ng-disabled="temp.inprocess">{{ _('extract') }}</button>\n              </div>\n            </div>\n        </form>\n    </div>\n  </div>\n</div>\n\n<div class="modal animated fadeIn" id="edit" ng-class="{\'modal-fullscreen\': fullscreen}">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n        <form ng-submit="edit(temp)">\n            <div class="modal-header">\n              <button type="button" class="close" data-dismiss="modal">\n                  <span aria-hidden="true">&times;</span>\n                  <span class="sr-only">{{ _('close') }}</span>\n              </button>\n              <button type="button" class="close mr5" ng-click="fullscreen=!fullscreen">\n                  <span>&loz;</span>\n                  <span class="sr-only">{{ _('toggle_fullscreen') }}</span>\n              </button>\n              <h4 class="modal-title">{{ _('edit_file') }}</h4>\n            </div>\n            <div class="modal-body">\n                <label class="radio">{{ _('file_content') }}</label>\n                <span class="label label-warning" ng-show="temp.inprocess">{{ _('loading') }} ...</span>\n                <textarea class="form-control code" ng-model="temp.tempModel.content" ng-show="!temp.inprocess" autofocus="autofocus"></textarea>\n                <div ng-include data-src="\'error-bar\'" class="clearfix"></div>\n            </div>\n            <div class="modal-footer">\n              <button type="button" class="btn btn-default" data-dismiss="modal" ng-disabled="temp.inprocess">{{ _('cancel') }}</button>\n              <button type="submit" class="btn btn-primary" ng-disabled="temp.inprocess">{{ _('edit') }}</button>\n            </div>\n        </form>\n    </div>\n  </div>\n</div>\n\n<div class="modal animated fadeIn" id="newfolder">\n  <div class="modal-dialog">\n    <div class="modal-content">\n        <form ng-submit="createFolder(temp)">\n            <div class="modal-header">\n              <button type="button" class="close" data-dismiss="modal">\n                  <span aria-hidden="true">&times;</span>\n                  <span class="sr-only">{{ _('close') }}</span>\n              </button>\n              <h4 class="modal-title">{{ _('create_folder') }}</h4>\n            </div>\n            <div class="modal-body">\n              <label class="radio">{{ _('folder_name') }}</label>\n              <input class="form-control" ng-model="temp.tempModel.name" autofocus="autofocus">\n              <div ng-include data-src="\'error-bar\'" class="clearfix"></div>\n            </div>\n            <div class="modal-footer">\n              <button type="button" class="btn btn-default" data-dismiss="modal" ng-disabled="temp.inprocess">{{ _('cancel') }}</button>\n              <button type="submit" class="btn btn-primary" ng-disabled="temp.inprocess">{{ _('create') }}</button>\n            </div>\n        </form>\n    </div>\n  </div>\n</div>\n\n<div class="modal animated fadeIn" id="uploadfile">\n  <div class="modal-dialog">\n    <div class="modal-content">\n        <form ng-submit="uploadUsingUpload()">\n            <div class="modal-header">\n              <button type="button" class="close" data-dismiss="modal" ng-click="showModal()">\n                  <span aria-hidden="true">&times;</span>\n                  <span class="sr-only">{{ _('close') }}</span>\n              </button>\n                 <button data-dismiss="modal" ng-show="!hide" type="button" class="close" style="padding-right:10px;padding-top:10px" ng-click="hideModal()">\n                  <span aria-hidden="true" style="padding-top:2px" >&macr;</span>\n                  <span class="sr-only">{{ _('hide') }}</span>\n              </button>\n              <h4 class="modal-title">{{ _('upload_file') }}</h4>\n            </div>\n            <div class="modal-body">\n              <label class="radio">{{ _('files_will_uploaded_to') }} <b>{{fileNavigator.currentPath.join(\'/\')}}</b></label>\n              <input type="file" class="form-control" ng-file="$parent.uploadFileList" autofocus="autofocus" multiple="multiple" id=\'upl_dile\'/>\n              <div ng-include data-src="\'error-bar\'" class="clearfix"></div>\n                <div ng-show="$parent.uploadFileList.length > 0">{{f.$error}} {{f.$errorParam}}\n                      <span class="progress" ng-show="f.progress > 0">\n                          <div ng-bind="f.progress + \'%\'" style="color: black"></div>\n                      </span>\n                    </div>\n            </div>\n            <div class="modal-footer">\n              <div ng-show="!fileUploader.requesting">\n                  <button type="button" ng-click="abort()"  class="btn btn-default" data-dismiss="modal">{{ _('cancel') }}</button>\n                  <button type="submit" class="btn btn-primary" ng-disabled="uploading(uploadFileList) === false">{{ _('upload') }}</button>\n              </div>\n              <div ng-show="fileUploader.requesting">\n                  <span class="label label-warning">{{ _('uploading') }} ...</span>\n              </div>\n\n            </div>\n\n        </form>\n    </div>\n  </div>\n</div>\n\n<div class="modal animated fadeIn" id="changepermissions">\n  <div class="modal-dialog">\n    <div class="modal-content">\n        <form ng-submit="changePermissions(temp)">\n            <div class="modal-header">\n              <button type="button" class="close" data-dismiss="modal">\n                  <span aria-hidden="true">&times;</span>\n                  <span class="sr-only">{{ _('close') }}</span>\n              </button>\n              <h4 class="modal-title">{{ _('change_permissions') }}</h4>\n            </div>\n            <div class="modal-body">\n              <table class="table mb0">\n                  <thead>\n                      <tr>\n                          <th>{{ _('permissions') }}</th>\n                          <th class="col-xs-1 text-center">{{_(\'exec\')}}</th>\n                          <th class="col-xs-1 text-center">{{_(\'read\')}}</th>\n                          <th class="col-xs-1 text-center">{{_(\'write\')}}</th>\n                      </tr>\n                  </thead>\n                  <tbody>\n                      <tr ng-repeat="(permTypeKey, permTypeValue) in temp.tempModel.perms">\n                          <td>{{_(permTypeKey)}}</td>\n                          <td ng-repeat="(permKey, permValue) in permTypeValue" class="col-xs-1 text-center" ng-click="main()">\n                              <label class="col-xs-12">\n                                <input type="checkbox" ng-model="temp.tempModel.perms[permTypeKey][permKey]">\n                              </label>\n                          </td>\n                      </tr>\n                </tbody>\n              </table>\n              <div class="checkbox" ng-show="config.enablePermissionsRecursive && temp.model.type === \'dir\'">\n                <label>\n                  <input type="checkbox" ng-model="temp.tempModel.recursive"> {{_(\'recursive\')}}\n                </label>\n              </div>\n              <div class="clearfix mt10">\n                  <span class="label label-primary pull-left">\n                    {{_(\'original\')}}: {{temp.model.perms.toCode(temp.model.type === \'dir\'?\'d\':\'-\')}} ({{temp.model.perms.toOctal()}})\n                  </span>\n                  <span class="label label-primary pull-right">\n                    {{_(\'changes\')}}: {{temp.tempModel.perms.toCode(temp.model.type === \'dir\'?\'d\':\'-\')}} ({{temp.tempModel.perms.toOctal()}})\n                  </span>\n              </div>\n              <div ng-include data-src="\'error-bar\'" class="clearfix"></div>\n            </div>\n            <div class="modal-footer">\n              <button type="button" class="btn btn-default" data-dismiss="modal">{{_("cancel")}}</button>\n              <button type="submit" class="btn btn-primary" ng-disabled="">{{\'change\'}}</button>\n            </div>\n        </form>\n    </div>\n  </div>\n</div>\n\n<div class="modal animated fadeIn" id="selector" ng-controller="ModalFileManagerCtrl">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal">\n            <span aria-hidden="true">&times;</span>\n            <span class="sr-only">{{_("close")}}</span>\n        </button>\n        <h4 class="modal-title">{{_("select_destination_folder")}}</h4>\n      </div>\n      <div class="modal-body">\n\n\n\n        <div>\n            <div ng-include="config.tplPath + \'/current-folder-breadcrumb.html\'"></div>\n            <div ng-include="config.tplPath + \'/main-table-modal.html\'"></div>\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal" ng-disabled="temp.inprocess">{{_("close")}}</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<script type="text/ng-template" id="path-selector">\n    <div class="panel panel-primary mt10 mb0">\n      <div class="panel-body">\n          <div class="detail-sources">\n            <code class="mr5"><b>{{_("source")}}:</b> {{temp.model.fullPath()}}</code>\n          </div>\n          <div class="detail-sources">\n            <code class="mr5"><b>{{_("destination")}}:</b>{{temp.tempModel.fullPath()}}</code>\n            <a href="" class="label label-primary" ng-click="openNavigator(temp)">{{_(\'change\')}}</a>\n          </div>\n      </div>\n    </div>\n</script>\n<script type="text/ng-template" id="error-bar">\n    <div class="label label-danger error-msg pull-left animated fadeIn" ng-show="temp.error">\n      <i class="glyphicon glyphicon-remove-circle"></i> {{temp.error}}\n    </div>\n</script>\n\n
navbar.html
<nav class="navbar navbar-inverse">\n  <div class="container-fluid">\n    <div class="navbar-header">\n      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\n        <span class="sr-only">Toggle</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n          </div>\n    <div id="navbar" class="navbar-collapse collapse">\n      <div class="navbar-form navbar-right">\n          <span class="progressbar" ng-show="f.progress > 0 && hide === true" ng-click="showModal()" data-toggle="modal" data-target="#uploadfile"><div ng-bind="\'Uploading - \'+f.progress + \'%\'"></div></span>          <input type="text" class="form-control input-sm" placeholder="{{_(\'search\')}}..." ng-enter = "$parent.search(query)" ng-model="$parent.query">\n        <button class="btn btn-default btn-sm" data-toggle="modal" data-target="#newfolder" ng-click="touch()" ng-disabled='can_upload !== true'>\n            <i class="glyphicon glyphicon-plus"></i> {{_("create_folder")}}\n        </button>\n        <button title="{{ can_upload !== true?_(can_upload):_('upload_file') }}" class="btn btn-default btn-sm" data-toggle="modal" data-target="#uploadfile" ng-disabled='can_upload !== true'>\n            <i class="glyphicon glyphicon-upload"></i> {{_("upload_file")}}\n        </button>\n\n        <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="dropDownMenuRoots" data-toggle="dropdown" aria-expanded="true">\n            <i class="glyphicon glyphicon-globe"></i> {{ root_name }} <span class="caret"></span>\n        </button>\n        <ul class="dropdown-menu" role="menu" aria-labelledby="dropDownMenuRoots">\n          <li ng-repeat="rootdir in rootdirs"  role="presentation" ><a role="menuitem" tabindex="-1" href="" ng-click="changeRoot(rootdir)" style = "{{root_name === rootdir.name? 'color:blue': '' }}" >{{ rootdir.name }}</a></li>\n        </ul>\n\n        <button class="btn btn-default btn-sm" ng-click="$parent.setTemplate(\'main-icons.html\')" ng-show="$parent.viewTemplate !== \'main-icons.html\'" title="{{_(\'icons\')}}">\n            <i class="glyphicon glyphicon-th-large"></i>\n        </button>\n        <button class="btn btn-default btn-sm" ng-click="$parent.setTemplate(\'main-table.html\')" ng-show="$parent.viewTemplate !== \'main-table.html\'" title="{{_(\'list\')}}">\n            <i class="glyphicon glyphicon-th-list"></i>\n        </button>\n\n      </div>\n    </div>\n  </div>\n</nav>\n\n
sidebar.html
<ul class="nav nav-sidebar file-tree-root">\n    <li ng-repeat="item in fileNavigator.history" ng-include="\'folder-branch-item\'" ng-class="{\'active\': item.name == fileNavigator.currentPath.join(\'/\')}"></li>\n</ul>\n\n<script type="text/ng-template" id="folder-branch-item">\n    <a href="" ng-click="fileNavigator.folderClick(item.item)" class="animated fast fadeInDown">\n        <i class="glyphicon glyphicon-folder-close mr2" ng-hide="isInThisPath(item.name)"></i>\n        <i class="glyphicon glyphicon-folder-open mr2"  ng-show="isInThisPath(item.name)"></i>\n        {{ (item.name.split(\'/\').pop() || \'/\') | strLimit : 24 }}\n    </a>\n    <ul class="nav nav-sidebar">\n        <li ng-repeat="item in item.nodes" ng-include="\'folder-branch-item\'" ng-class="{\'active\': item.name == fileNavigator.currentPath.join(\'/\')}"></li>\n    </ul>\n</script>\n\n
spinner.html
<div class="spinner-container col-xs-12">\n    <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">\n       <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>\n    </svg>\n</div>\n\n}]);