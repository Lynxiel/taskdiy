import React from "react";
import { RouteObject } from "react-router-dom";
import E404 from "../components/errors/E404";

import HomeView from "../views/Home";
import AuthGuard from "../components/AuthGuard";
import AuthLoginView from "../views/Login";
import BoardView from "../views/Board";
import CreateListItem from "../components/board/CreateListItem";
// import OfficeProfileView from "../views/office/Profile";
// import PostsIndexView from "../views/posts/Index";
// import PostsShowView from "../views/posts/Show";
// import OfficeBaseView from "../views/office/Base";
// import OfficePostsIndexView from "../views/office/posts/Index";
// import OfficePostsCreateView from "../views/office/posts/Create"
// import OfficePostsItemBase from "../views/office/posts/ItemBase";
// import OfficePostsItemShow from "../views/office/posts/ItemShow";
// import OfficePostsItemEditView from "../views/office/posts/ItemEdit";

const routes: RouteObject[] = [
	{
		path: "/",
		element:  <AuthGuard><HomeView /></AuthGuard>,
	},
	{
		path: "/boards/:id",
		element:  <AuthGuard><BoardView /></AuthGuard>,
	},
	
	// {
	// 	path: "/posts",
	// 	element: <PostsIndexView />
	// },
	// {
	// 	path: "/posts/:id",
	// 	element: <PostsShowView />
	// },
	{
		path: "/login",
		element: <AuthGuard guestMode={true}><AuthLoginView /></AuthGuard>
	},
	// {
	// 	path: "/office",
	// 	element: <AuthGuard><OfficeBaseView /></AuthGuard>,
	// 	children: [
	// 		{
	// 			path: "/office",
	// 			element: <OfficeProfileView />
	// 		},
	// 		{
	// 			path: "/office/posts",
	// 			element: <OfficePostsIndexView />
	// 		},
	// 		{
	// 			path: "/office/posts/create",
	// 			element: <OfficePostsCreateView />
	// 		},
	// 		{
	// 			path: "/office/posts/:id",
	// 			element: <OfficePostsItemBase />,
	// 			children: [
	// 				{
	// 					path: "/office/posts/:id",
	// 					element: <OfficePostsItemShow />
	// 				},
	// 				{
	// 					path: "/office/posts/:id/edit",
	// 					element: <OfficePostsItemEditView />
	// 				}
	// 			]
	// 		},
	// 	]
	// },
	{
		path: "*",
		element: <E404 />
	}
];

export default routes;