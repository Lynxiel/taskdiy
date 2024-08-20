export type AppStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export default function createStoragePlugin() : AppStorage{
	return import.meta.env.SSR ? new Memory() : localStorage;
}

class Memory implements AppStorage{
	private items: Record<string, string> = {}

	getItem(key: string){
		return this.items[key];
	}

	setItem(key: string, value: string){
		this.items[key] = value;
	}

	removeItem(key: string){
		delete this.items[key];
	}
}