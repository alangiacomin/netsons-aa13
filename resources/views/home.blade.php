<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="theme-dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content="Qui description"/>
    <title>Qui title</title>
    @viteReactRefresh
    @vite([
        'resources/css/vendor.scss',
        'resources/css/app.scss',
        'resources/js/index.tsx'
    ])
</head>
<body>
<div id="app"/>
</body>
</html>
