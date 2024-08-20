export type WithTimeStamps<T extends Record<string, unknown>> = T & {
	"created_at": string,
	"updated_at": string,
}

export type WithUser<T extends Record<string, unknown>> = T & {
	User: TUser
}

export type TUser = {
	"id": number,
	"name": string,
	"email": string,
	"email_verified_at" : string,
}

export type TPost = WithTimeStamps<{
	"id": number,
	"url": string,
	"title": string,
	"content": string,
	"UserId": number
}>

export type TAuth = {
	"auth": true,
	"user": TUser
} | 
{ "auth": false }



export type TErrorBag422 = [ string, string, Array<string | number> ][]