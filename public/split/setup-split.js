Split(['#left-side', '#right-side'], {
    gutter: function (index, direction) {
        var gutter = document.createElement('div')
        gutter.className = 'gutter gutter-' + direction
        gutter.style.height = '100vh'
        return gutter
    },
    gutterSize: 4,
})

