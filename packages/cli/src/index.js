import { program } from 'commander';

program
    .command('init')
    .description('initialize a project')
    .action(() => {
        console.log('init');
    });

program
    .command('make')
    .description('make a recipe')
    .action(() => {
        console.log('make');
    });

program.parse(process.argv);
