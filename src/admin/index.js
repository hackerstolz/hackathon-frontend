import CMS from "netlify-cms";
import * as ColorWidget from "netlify-cms-widget-color";

// Register widgets
CMS.registerWidget("color", ColorWidget.Control);
