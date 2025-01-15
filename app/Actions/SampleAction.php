<?php
namespace App\Actions;

use Illuminate\Console\Command;
use Lorisleiva\Actions\Concerns\AsAction;

class SampleAction
{
    use AsAction;

    public string $commandSignature = 'run:sample {input}';

    public function handle(string $input): string
    {
        // Perform some action and return a result
        return strtoupper($input);
    }

    public function asCommand(Command $command): void
    {
        $input = $command->argument('input');
        $result = $this->handle($input);

        $command->info('Output: ' . $result);
    }
}
