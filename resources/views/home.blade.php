<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <title>Qui title</title>
    @viteReactRefresh
    @vite([
        'resources/css/vendor.scss',
        'resources/css/app.scss',
        'resources/js/index.tsx'
    ])
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content="Qui description"/>
</head>
<body>
<div id="app"/>
</body>
</html>
