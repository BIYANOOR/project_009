#!/bin/env node
import inquirer from 'inquirer';
import figlet from 'figlet';
import chalk from 'chalk';
class CountdownTimer {
    endTime;
    intervalId = null;
    constructor(duration) {
        this.endTime = Date.now() + duration * 1000;
    }
    getRemainingTime() {
        const now = Date.now();
        const timeDiff = this.endTime - now;
        if (timeDiff <= 0) {
            return "00:00:00";
        }
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        const formatTime = (time) => (time < 10 ? `0${time}` : time);
        return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }
    start() {
        this.intervalId = setInterval(() => {
            console.log(chalk.cyan(`⏳ Time left: ${this.getRemainingTime()}`));
            if (this.getRemainingTime() === "00:00:00") {
                this.stop();
                console.log(chalk.green(figlet.textSync("Finished! 🎉")));
            }
        }, 1000);
    }
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}
async function main() {
    console.log(chalk.blue(figlet.textSync("Countdown Timer")));
    console.log(chalk.yellow("⏲️ Welcome to the Countdown Timer!"));
    const answer = await inquirer.prompt({
        name: 'duration',
        type: 'number',
        message: '⌛ Enter the countdown duration in seconds:',
        validate: (value) => value > 0 || '🚫 Please enter a positive number.',
    });
    const countdownTimer = new CountdownTimer(answer.duration);
    countdownTimer.start();
}
main();
