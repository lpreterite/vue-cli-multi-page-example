const baseSet = (name, title="")=>{return {
    [`${name}`]:{
        entry:`src/pages/${name}`,
        filename: `${name}.html`,
        title
    }
}}

const pages = {
    ...baseSet('home'),
    ...baseSet('login'),
    ...baseSet('register'),
}

module.exports = {
    pages,
    chainWebpack: config =>{
        if (process.env.NODE_ENV !== 'production') return
        Object
            .keys(pages)
            .forEach(pageName=>{
                config
                    .plugin(`html-${pageName}`)
                    .tap(args=>{
                        args[0].filename = `${pageName}.blade.php`
                        return args
                    })
                config
                    .plugin(`preload-${pageName}`)
                    .tap(args=>{
                        args[0].includeHtmlNames = [`${pageName}.blade.php`]
                        return args
                    })
                config
                    .plugin(`prefetch-${pageName}`)
                    .tap(args=>{
                        args[0].includeHtmlNames = [`${pageName}.blade.php`]
                        return args
                    })
            })
    }
}