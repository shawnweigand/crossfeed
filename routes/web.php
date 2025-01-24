<?php

use App\Data\FeedData;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\Invokeable\SearchPostsController;
use App\Http\Controllers\Invokeable\SearchChannelsController;
use App\Http\Controllers\Invokeable\SelectFeedController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing'/*'Welcome'*/, [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::resource('feed', FeedController::class)
    ->middleware(['auth', 'verified']);

Route::resource('channel', ChannelController::class)
    ->middleware(['auth', 'verified']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'feeds' => fn () => FeedData::collect(Auth::user()->feeds)
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

######## Invokable ########
Route::post('select', SelectFeedController::class)->name('select')->middleware(['auth', 'verified']);
Route::get('channels', SearchChannelsController::class)->name('channels')->middleware(['auth', 'verified']);
Route::get('{feed}/posts', SearchPostsController::class)->name('posts')->middleware(['auth', 'verified']);

// For liveness probe
Route::get('/healthz', function () {
    return response()->json(['status' => 'healthy', 'code' => 200], 200);
});

require __DIR__.'/auth.php';
