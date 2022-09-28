import { isEmailValid, isGithub, isPasswordVaild, registerValid } from '../utils/valid';

describe('Valid', () => {
    describe('Email', () => {
        test('react@gmail.com', () => {
            expect(isEmailValid("react@gmail.com")).toBe(true)
        });
        test('react@ gmail.com', () => {
            expect(isEmailValid("react@ gmail.com")).toBe(false)
        });
        test('react@gmail', () => {
            expect(isEmailValid("react@gmail")).toBe(false)
        });
        test('react', () => {
            expect(isEmailValid("react")).toBe(false)
        });
        test('', () => {
            expect(isEmailValid("")).toBe(false)
        });
        test('@gmail.com@gmail.com', () => {
            expect(isEmailValid("@gmail.com@gmail.com")).toBe(false)
        });
    })
    describe('Password', () => {
        test('sdffds', () => {
            expect(isPasswordVaild("sdffds")).toBe(false)
        });
        test('', () => {
            expect(isPasswordVaild("")).toBe(false)
        });
        test('react@gmail', () => {
            expect(isPasswordVaild("react@gmsdffdsail")).toBe(true)
        });
        test('reacdsfdffdssssssssssssssssssssssssssssssssssssssssssssdsfsdft', () => {
            expect(isPasswordVaild("reacdsfdffdssssssssssssssssssssssssssssssssssssssssssssdsfsdft")).toBe(false)
        });
        test('12345678', () => {
            expect(isPasswordVaild("12345678")).toBe(true)
        });
        test('@gmail.com@gmail.com', () => {
            expect(isPasswordVaild("@gmail.com@gmail.com")).toBe(true)
        });
    })
    
    describe('github', () => {
        test('sdffds', () => {
            expect(isGithub("sdffds")).toBe(false)
        });
        test('', () => {
            expect(isGithub("")).toBe(false)
        });
        test('https://github.com/', () => {
            expect(isGithub("https://github.com/")).toBe(false)
        });
        test('https://github.com/BlueRexPY', () => {
            expect(isGithub("https://github.com/BlueRexPY")).toBe(true)
        });
    })

    describe('register', () => {
        test('name,surename,react@gmail.com,password,https://github.com/BlueRexPY', () => {
            expect(registerValid("name","surename","react@gmail.com","password","https://github.com/BlueRexPY")).toBe(true)
        });
        test('me,surename,react@gmail,paword,https://github.c', () => {
            expect(registerValid("me","sureame","react@gmail","paword","https://github.c")).toBe(false)
        });
    })

  });