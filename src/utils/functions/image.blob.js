export function getImageFromResponse(res){
    const blob = new Blob([res.data], { type: res.headers['Content-Type'] })
	const url = URL.createObjectURL(blob)
	return res.data.byteLength === 0 ? null : url
}