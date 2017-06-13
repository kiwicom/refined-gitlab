import ROUTES from "./libs/ROUTES";

import pathnameToRoute from "./libs/helpers/pathnameToRoute";

import expandAll from "./libs/transformations/expandAll";
import rotateDiscussion from "./libs/transformations/rotateDiscussion";
import expandSidePanel from "./libs/transformations/expandSidePanel";
import divideLabels from "./libs/transformations/divideLabels";
import filterItems from "./libs/transformations/filterItems";
import alignLabels from "./libs/transformations/alignLabels";
import otherDeployLinks from "./libs/transformations/otherDeployLinks";


const route = pathnameToRoute(location.pathname);
switch (route) {
	case ROUTES.MR:
	case ROUTES.ISSUE:
		expandAll();
		rotateDiscussion("notes-list");
		expandSidePanel();
		divideLabels();
		otherDeployLinks();
		break;
	case ROUTES.MRS:
	case ROUTES.ISSUES:
		filterItems("filtered-search-box");
		alignLabels(route);
}
