<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content="Qui description"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Qui title</title>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr"
        crossorigin="anonymous"/>
    @viteReactRefresh
    @vite([
        'resources/css/vendor.css',
        'resources/css/app.css',
        'resources/js/index.tsx'
    ])
</head>
<body>
<div id="app"/>
</body>
</html>
