export const playVideo =async (id)=>{
    const res = await fetch(`/api/${id}?q=movie`)
        const data = await res.json();
        window.open(data?.iframeUrl , '_blank')
}
export const playTv =async (id,s,e)=>{
    const res = await fetch(`/api/${id}?q=tv_${s}-${e}`)
        const data = await res.json();
        window.open(data?.iframeUrl , '_blank')
}

