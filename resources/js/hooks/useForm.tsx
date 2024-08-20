import { isAxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { TErrorBag422 } from "../types/data";
import { ruleToText } from "../shared/validation";

export default function useForm<
	T extends Record<string, string | number>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	R extends (values: T) => Promise<any>
>(
	initial: T,
	resolver: R,
	onSuccess: (args: Awaited<ReturnType<R>>) => void
){
	const [ pending, setPending ] = useState(false);
	const [ data, setData ] = useState(initial);
	const [ errors, setErrors ] = useState<Partial<T>>({});

	function update<K extends keyof T>(key: K, value: T[K]){
		setData(prevData => ({
			...prevData,
			[key]: value
		}))
	}

	function bind<
		K extends keyof T, 
		Elem extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
	>(key: K){
		return {
			name: key,
			value: data[key],
			onChange: (e: ChangeEvent<Elem>) => update(
				key, 
				( typeof data[key] === 'number' ? +e.target.value : e.target.value ) as T[K]
				// developer must make tests when as operator used
			)
		}
	}

	function showError<K extends keyof T>(key: K){
		return errors[key] && <div className="text-danger">
			{ errors[key] }
		</div>
	}

	async function send(){
		setPending(true);
		setErrors({});

		try{
			const result = await resolver(data);
			onSuccess(result);
		}
		catch(e){
			if(isAxiosError(e) && e.response?.status === 422){
				const backendErrors = e.response.data as TErrorBag422;
				const backendErrorsMap = Object.fromEntries(
					backendErrors.map(([ name, rule, args ]) => [
						name,
						ruleToText(rule, args)
					])
					.filter(( [ name ] ) => ( name in data ) )
				)
				
				setErrors(backendErrorsMap);
			}
			else{
				throw e;
			}
		}
		finally{
			setPending(false);
		}
	}

	return { data, update, bind, send, errors, showError, pending };
}


/* const a: unknown = 1;

	if(isObject(a)){
		a
	}

function isObject(item: unknown) : item is object{
	return typeof item === 'object' && item !== null;
} */