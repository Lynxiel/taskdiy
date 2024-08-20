import React from 'react'

type E404Props = {
	text?: string
}

export default function E404({ text = 'Page not found' }: E404Props){
	return <div>
		<h1>Error 404</h1>
		<div className="alert alert-danger">{ text }</div>
	</div>;
}