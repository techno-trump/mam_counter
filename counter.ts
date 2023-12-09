class $ayk_lom extends $ayk_lom_view {
	// Синхронизайия с localStorage,
	// все вкладки приложения будут синхронизироваться
	storage<Value>( key: string, next?: Value ) {
		if ( next === undefined ) return JSON.parse( localStorage.getItem( key ) ?? 'null' )

		if ( next === null ) localStorage.removeItem( key )
		else localStorage.setItem( key, JSON.stringify( next ) )

		return next
	}

	count( next?: number ) {
		return this.storage( 'count' , next ) ?? 0
	}

	count_str( next?: string ) {
		return this.count( next?.valueOf && Number(next) ).toString()
	}

	inc() {
		this.count( this.count() + 1 )
	}

	dec() {
		this.count( this.count() - 1 )
	}

	// Создаем инстанс Button
	// Переопределяем title
	// click биндим на this.inc
	_Inc = null as unknown as $ayk_lom_view
	Inc() {
		if (this._Inc) return this._Inc
		
		const obj = new $ayk_lom_button
		obj.title = ()=> '+'
		obj.click = ()=> this.inc()

		return this._Inc = obj
	}

	_Dec = null as unknown as $ayk_lom_view
	Dec() {
		if (this._Dec) return this._Dec

		const obj = new $ayk_lom_button
		obj.title = ()=> '-'
		obj.click = ()=> this.dec()

		return this._Dec = obj
	}

	_Count = null as unknown as $ayk_lom_view
	Count() {
		if (this._Count) return this._Count

		const obj = new $ayk_lom_input
		obj.value = (next?: string)=> this.count_str( next )

		return this._Count = obj
	}

	sub() {
		return [
			this.Dec(),
			this.Count(),
			this.Inc(),
		]
	}

	static mount() {
		if ( typeof document === 'undefined' ) return // +
		const node = document.querySelector( '#root' )
		const obj = new $ayk_lom()

		node?.replaceWith( obj.dom_tree() )

		// Реактивность добавится в следующей главе, сейчас воспользуемся костылем
		setInterval( ()=> obj.dom_tree() , 100 )
	}
}

// Вызываем для монтирования приложения в DOM-дерево
$ayk_lom.mount()
