import { useMemo } from "react";
import { useParams } from "react-router-dom";

export default function useRouteInt(name: string){
	const params = useParams();
	const strId = params[name] ?? '';

	const res = useMemo(() => {
		const valid = /^[1-9]+\d*$/.test(strId)
		return { valid, value: valid ? +strId : NaN }
	}, [ strId ]);

	return res;
}