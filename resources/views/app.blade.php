<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'RS LNG Badak') }}</title>
        <link rel="icon" href="{{ asset('img/Logo-RS.png') }}" type="image/x-icon">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <!-- Icon -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <style>
            .bg-rs {
                background-image: url('{{ asset('img/bg.jpg') }}');
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
            }
            .bg-main {
                background-image: url('{{ asset('img/bg.svg') }}');
                background-size: cover;
                background-repeat: repeat;
                background-position: center;
            }
        </style>
        @inertia
        @include('sweetalert::alert')
    </body>
</html>
