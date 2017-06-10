import ROUTES from "./libs/ROUTES";

import pathnameToRoute from "./libs/helpers/pathnameToRoute";

import expandAll from "./libs/transformations/expandAll";
import rotateDiscussion from "./libs/transformations/rotateDiscussion";
import expandSidePanel from "./libs/transformations/expandSidePanel";
import divideLabels from "./libs/transformations/divideLabels";
import filterItems from "./libs/transformations/filterItems";
import alignLabels from "./libs/transformations/alignLabels";


const route = pathnameToRoute(location.pathname);
switch (route) {
	case ROUTES.MR:
	case ROUTES.ISSUE:
		expandAll();
		rotateDiscussion("notes-list");
		expandSidePanel("right-sidebar-collapsed", "right-sidebar-expanded", "ASIDE", "gutter-toggle", "page-gutter");
		divideLabels();
		break;
	case ROUTES.MRS:
	case ROUTES.ISSUES:
		filterItems("filtered-search-box");
		alignLabels(route);
}
