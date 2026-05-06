<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar Personaje - MarioDex</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        form { max-width: 400px; }
        label { display: block; margin-top: 10px; }
        input { width: 100%; padding: 8px; margin-top: 5px; }
        button { margin-top: 20px; padding: 10px; background: #007bff; color: white; border: none; cursor: pointer; }
        .error { color: red; }
        .success { color: green; }
    </style>
</head>
<body>
    <h1>Registrar Personaje de Mario Bros</h1>

    @if(session('success'))
        <p class="success">{{ session('success') }}</p>
    @endif

    <form action="{{ route('personaje.store') }}" method="POST">
        @csrf

        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" value="{{ old('nombre') }}">
        @error('nombre') <p class="error">{{ $message }}</p> @enderror

        <label for="tipo">Tipo:</label>
        <input type="text" name="tipo" id="tipo" value="{{ old('tipo') }}">
        @error('tipo') <p class="error">{{ $message }}</p> @enderror

        <label for="poder">Poder:</label>
        <input type="number" name="poder" id="poder" value="{{ old('poder') }}">
        @error('poder') <p class="error">{{ $message }}</p> @enderror

        <label for="mundo">Mundo:</label>
        <input type="text" name="mundo" id="mundo" value="{{ old('mundo') }}">
        @error('mundo') <p class="error">{{ $message }}</p> @enderror

        <button type="submit">Registrar Personaje</button>
    </form>
</body>
</html>
