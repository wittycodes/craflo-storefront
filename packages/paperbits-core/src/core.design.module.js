"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreDesignModule = void 0;
const hinter_1 = require("@paperbits/common/tutorials/hinter");
const confirmation_1 = require("./workshops/confirmation/ko/confirmation");
const bindingHandlers_lightbox_1 = require("./ko/bindingHandlers/bindingHandlers.lightbox");
const bindingHandlers_grid_1 = require("./ko/bindingHandlers/bindingHandlers.grid");
const bindingHandlers_draggables_1 = require("./ko/bindingHandlers/bindingHandlers.draggables");
const core_module_1 = require("./core.module");
const videoPlayer_design_module_1 = require("./video-player/videoPlayer.design.module");
const picture_design_module_1 = require("./picture/picture.design.module");
const youtubePlayer_design_module_1 = require("./youtube-player/youtubePlayer.design.module");
const buttonEditor_module_1 = require("./button/ko/buttonEditor.module");
const testimonialsEditor_module_1 = require("./testimonials/ko/testimonialsEditor.module");
const columnEditor_module_1 = require("./column/ko/columnEditor.module");
const sectionEditor_module_1 = require("./section/ko/sectionEditor.module");
const rowEditor_module_1 = require("./row/ko/rowEditor.module");
const block_module_1 = require("./workshops/block/ko/block.module");
const page_design_module_1 = require("./workshops/page/ko/page.design.module");
const media_module_1 = require("./workshops/media/ko/media.module");
const navigation_module_1 = require("./workshops/navigation/ko/navigation.module");
const settings_module_1 = require("./workshops/settings/ko/settings.module");
const workshops_1 = require("./workshops/ko/workshops");
const textblockEditor_module_1 = require("./textblock/ko/textblockEditor.module");
const dropbucket_module_1 = require("./workshops/dropbucket/ko/dropbucket.module");
const viewport_selector_1 = require("./workshops/viewports/ko/viewport-selector");
const ko_1 = require("./workshops/localization/ko");
const bindingHandlers_1 = require("./ko/bindingHandlers");
const editing_1 = require("@paperbits/common/editing");
const hyperlinkSelector_1 = require("./workshops/hyperlinks/ko/hyperlinkSelector");
const widgetSelector_1 = require("./workshops/widgets/ko/widgetSelector");
const urlSelector_1 = require("./workshops/urls/ko/urlSelector");
const layout_design_module_1 = require("./layout/ko/layout.design.module");
const urlHyperlinkProvider_1 = require("@paperbits/common/urls/urlHyperlinkProvider");
const media_1 = require("@paperbits/common/media");
const draggables_1 = require("@paperbits/common/ui/draggables");
const errors_1 = require("@paperbits/common/errors");
const placeholderViewModel_1 = require("./placeholder/ko/placeholderViewModel");
const ui_1 = require("./ko/ui");
const validators_1 = require("./ko/validation/validators");
const cropper_1 = require("./workshops/cropper/cropper");
const ko_2 = require("./grid/ko");
const cardEditor_module_1 = require("./card/ko/cardEditor.module");
const mediaPermalinkResolver_design_1 = require("@paperbits/common/media/mediaPermalinkResolver.design");
const gridEditor_module_1 = require("./grid-layout-section/ko/gridEditor.module");
const gridCellEditor_module_1 = require("./grid-cell/ko/gridCellEditor.module");
const tray_1 = require("./workshops/tray/tray");
const ko_3 = require("./collapsible-panel/ko");
const ko_4 = require("./menu/ko");
const ko_5 = require("./ko");
const designerUserService_1 = require("./ko/ui/designerUserService");
const ko_6 = require("./workshops/roles/ko");
require("./ko/bindingHandlers/bindingHandlers.command");
require("./ko/bindingHandlers/bindingHandlers.dialog");
require("./ko/bindingHandlers/bindingHandlers.activate");
require("./ko/bindingHandlers/bindingHandlers.whenInView");
const ko_7 = require("./content/ko");
const viewStack_1 = require("./ko/ui/viewStack");
const mediaDisplay_1 = require("./workshops/media/ko/mediaDisplay");
const lightbox_1 = require("./workshops/media/ko/lightbox");
const map_design_module_1 = require("./map/ko/map.design.module");
const caching_1 = require("@paperbits/common/caching");
const ko_8 = require("./carousel/ko");
class CoreDesignModule {
    register(injector) {
        injector.bindModule(new core_module_1.CoreModule());
        injector.bindCollection("styleGroups");
        injector.bindCollection("dropHandlers");
        injector.bindCollectionLazily("workshopSections");
        injector.bindCollection("trayCommands");
        injector.bindCollection("hyperlinkProviders");
        injector.bindSingleton("viewManager", ui_1.DefaultViewManager);
        injector.bindSingleton("tray", tray_1.Tray);
        injector.bindSingleton("viewStack", viewStack_1.ViewStack);
        injector.bind("mediaDisplay", mediaDisplay_1.MediaDisplay);
        injector.bindSingleton("changesCache", caching_1.MemoryCache);
        injector.bind("mediaHyperlinkProvider", media_1.MediaHyperlinkProvider);
        injector.bind("urlHyperlinkProvider", urlHyperlinkProvider_1.UrlHyperlinkProvider);
        injector.bind("gridEditor", ko_2.GridEditor);
        injector.bindToCollection("autostart", validators_1.KnockoutValidation);
        injector.bindToCollection("autostart", bindingHandlers_1.ResizableBindingHandler);
        injector.bindToCollection("autostart", cropper_1.CropperBindingHandler);
        injector.bindToCollection("autostart", bindingHandlers_1.BalloonBindingHandler);
        injector.bindToCollection("autostart", errors_1.UnhandledErrorHandler);
        injector.bind("tooltip", ui_1.Tooltip);
        injector.bindSingleton("dragManager", draggables_1.DragManager);
        injector.bindSingleton("lightbox", lightbox_1.Lightbox);
        injector.bind("placeholderWidget", placeholderViewModel_1.PlaceholderViewModel);
        injector.bindSingleton("htmlEditorProvider", editing_1.HtmlEditorProvider);
        injector.bindSingleton("mediaHandler", editing_1.MediaHandlers);
        injector.bind("workshops", workshops_1.Workshops);
        injector.bind("viewportSelector", viewport_selector_1.ViewportSelector);
        injector.bind("localeSelector", ko_1.LocaleSelector);
        injector.bind("localeEditor", ko_1.LocaleEditor);
        injector.bind("hyperlinkSelector", hyperlinkSelector_1.HyperlinkSelector);
        injector.bind("widgetSelector", widgetSelector_1.WidgetSelector);
        injector.bind("urlSelector", urlSelector_1.UrlSelector);
        injector.bind("confirmation", confirmation_1.Confirmation);
        injector.bind("roleSelector", ko_6.RoleSelector);
        injector.bind("roleInput", ko_6.RoleInput);
        injector.bind("spinner", ko_5.Spinner);
        injector.bindModule(new map_design_module_1.MapDesignModule());
        injector.bindToCollection("permalinkResolvers", mediaPermalinkResolver_design_1.MediaPermalinkResolver, "mediaPermalinkResolver");
        injector.bindModule(new textblockEditor_module_1.TextblockEditorModule());
        injector.bindModule(new picture_design_module_1.PictureDesignModule());
        injector.bindModule(new buttonEditor_module_1.ButtonEditorModule());
        injector.bindModule(new videoPlayer_design_module_1.VideoPlayerDesignModule());
        injector.bindModule(new youtubePlayer_design_module_1.YoutubePlayerDesignModule());
        injector.bindModule(new testimonialsEditor_module_1.TestimonialsEditorModule());
        injector.bindModule(new ko_4.MenuEditorModule());
        injector.bindModule(new dropbucket_module_1.DropbucketModule());
        injector.bindModule(new page_design_module_1.PageDesignModule());
        injector.bindModule(new media_module_1.MediaWorkshopModule());
        injector.bindModule(new layout_design_module_1.LayoutDesignModule());
        injector.bindModule(new block_module_1.BlockWorkshopModule());
        injector.bindModule(new navigation_module_1.NavigationWorkshopModule());
        injector.bindModule(new settings_module_1.SettingsWorkshopModule());
        injector.bindModule(new columnEditor_module_1.ColumnEditorModule());
        injector.bindModule(new rowEditor_module_1.RowEditorModule());
        injector.bindModule(new sectionEditor_module_1.SectionEditorModule());
        injector.bindModule(new gridEditor_module_1.GridEditorModule());
        injector.bindModule(new gridCellEditor_module_1.GridCellEditorModule());
        injector.bindModule(new ko_7.ContentEditorModule());
        injector.bindModule(new cardEditor_module_1.CardEditorModule());
        injector.bindModule(new ko_3.CollapsiblePanelEditorModule());
        injector.bindModule(new ko_8.CarouselDesignModule());
        injector.bindToCollection("hyperlinkProviders", urlHyperlinkProvider_1.UrlHyperlinkProvider);
        injector.bindToCollection("autostart", bindingHandlers_1.HostBindingHandler);
        injector.bindToCollection("autostart", bindingHandlers_draggables_1.DraggablesBindingHandler);
        injector.bindToCollection("autostart", bindingHandlers_grid_1.GridBindingHandler);
        injector.bindToCollection("autostart", bindingHandlers_lightbox_1.LightboxBindingHandler);
        injector.bindToCollection("autostart", hinter_1.Hinter);
        injector.bindInstance("reservedPermalinks", ["/", "/404", "/500"]);
        injector.resolve("workshopSections");
        const userService = new designerUserService_1.DesignerUserService();
        injector.bindInstance("userService", userService);
        injector.bindInstance("designerUserService", userService);
    }
}
exports.CoreDesignModule = CoreDesignModule;
//# sourceMappingURL=core.design.module.js.map