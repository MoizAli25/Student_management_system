#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
// Define a student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //Initialize an empty array for courses
        this.balance = 100;
    }
    // Method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // Method to view student balance
    view_balance() {
        console.log(`\nBalance for ${this.name} : $${this.balance}\n`);
    }
    // Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`\n$${amount} Fees paid successfully for ${this.name}\n`);
        console.log(`\nRemaining balance: $${this.balance}\n`);
    }
    // Method to display student status
    show_status() {
        console.log(`\nID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}\n`);
    }
}
// Defining a student student manager class to manage student
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student
    add_student(name) {
        let student = new Student(name);
        this, this.students.push(student);
        console.log(`\nStudent: ${name} added successfully.\nStudent ID: ${student.id}\n`);
    }
    // Method to enrolla student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`\n${student.name} enrolled in ${course} successfully.\n`);
        }
    }
    // Method to view student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.red("\n\tStudent not found please enter a correct student ID.\t\n"));
        }
    }
    // ethod to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.red("\n\tStudent not found please enter a correct student ID.\t\n"));
        }
    }
    // Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // Method to find a student by student id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// Main function to run the program
async function main() {
    console.log("\n\t------------------------------------------------------------------\t\n");
    console.log(chalk.green.bold("\n\tWelcome to Moiz Institute of technology - student management system\t\n"));
    console.log("\n\t------------------------------------------------------------------\t\n");
    let student_manager = new Student_manager();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student balance",
                    "Pay Fees",
                    "Show status",
                    "Exit"
                ]
            }
        ]);
        // Using switch case for user choices
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter Student name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.green.bold("\n\tExiting...\t\n"));
                process.exit();
        }
    }
}
// CALLING A MAIN FUNCTION
main();
