export function debounce2(func,delay){
		let timer=0
		return function(){
			if(timer) clearTimeout(timer)
			timer = setTimeout(function(){
				func.apply(this)
			},delay)
		}
	}