module.exports = {
	clearMocks: true,
	preset: 'ts-jest',
	testEnvironment: './prisma/prisma-test-environment.ts',
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	modulePaths: ['<rootDir>/src'],
};
