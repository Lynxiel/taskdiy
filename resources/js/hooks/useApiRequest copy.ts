import { useCallback, useState } from "react";

const initResponseValue = {
	status: 'idle',
	idle: true,
	pending: false,
	success: false,
	fail: false,
	data: null,
	error: null
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useApiRequest<T extends (...args: any[]) => Promise<any>>(
	fn: T, 
	config: ApiRequestConfig = {}
){
	type Result = Awaited<ReturnType<T>>;
	const [ request, setRequest ] = useState<ApiRequest<Result>>({ ...initResponseValue });
	
	const execute = useCallback((...args: Parameters<T>) => {
		if(config.skip){
			setRequest({ 
				status: 'error',
				idle: false, 
				pending: false, 
				data: null, 
				success: false, 
				fail: true,
				error: new Error('skipped') 
			});

			return;
		}
		
		setRequest({ ...initResponseValue, idle: false, pending: true, status: 'pending' });

		(async () => {
			try{
				const data = await fn(...args);
				setRequest({ status: 'success', idle: false, pending: false, data, success: true, fail: false, error: null });
			}
			catch(e){
				const success = false;
				
				setRequest({ 
					status: 'error',
					idle: false, 
					pending: false, 
					data: null, 
					success, 
					fail: !success,
					error: e instanceof Error ? e : new Error('hz') 
				});
			}
		})();
	}, [ fn, config.skip ])
		
	return [ request, execute ] as const;
}

export default useApiRequest;

type ApiRequestConfig = {
	skip?: boolean
}

type ApiRequestIdle = {
	status: 'idle',
	idle: true,
	pending: false,
	success: false,
	fail: false,
	data: null,
	error: null
}

type ApiRequestPending = {
	status: 'pending',
	idle: false,
	pending: true,
	success: false,
	fail: false,
	data: null,
	error: null
}

type ApiRequestError = {
	status: 'error',
	idle: false,
	pending: false,
	data: null, 
	success: false, 
	fail: true, 
	error: Error
}

type ApiRequestSuccess<T> = {
	status: 'success',
	idle: false,
	pending: false, 
	data: T, 
	success: true, 
	fail: false,
	error: null
}

type ApiRequest<T> = ApiRequestIdle | ApiRequestPending | ApiRequestError | ApiRequestSuccess<T>; 
