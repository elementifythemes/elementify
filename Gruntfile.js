module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Copy files
         */
        copy: {
            main: {
                options: {
                    mode: true
                },
                src: [
                    '**',
                    '!style - Copy.css',
                    '!node_modules/**',
                    '!build/**',
                    '!css/sourcemap/**',
                    '!.git/**',
                    '!bin/**',
                    '!.gitlab-ci.yml',
                    '!bin/**',
                    '!tests/**',
                    '!phpunit.xml.dist',
                    '!*.sh',
                    '!*.map',
                    '!.gitignore',
                    '!phpunit.xml',
                    '!README.md',
                    '!CONTRIBUTING.md',
                    '!codesniffer.ruleset.xml',
                    '!phpcs.ruleset.xml',
					'!phpcs.xml.dist',
					'!phpcs.xml.dist',
					'!composer.json',

                    /**
                     * Are you developer? Then add below files.
                     */
                    '!Gruntfile.js',
                    '!tailwind.config.js',
                    '!webpack.config.common.js',
                    '!webpack.config.dev.js',
                    '!webpack.config.prod.js',
                    '!package.json',
                    '!package-lock.json',
                    '!sass/**',
                    "!*.zip",
                ],
                dest: 'elementify/'
            }
        },

        /**
         * Compress files
         */
        compress: {
            main: {
                options: {
                    archive: 'elementify.zip',
                    mode: 'zip'
                },
                files: [
                    {
                        src: [
                            './elementify/**'
                        ]

                    }
                ]
            }
        },

        /**
         * Clean files
         */
        clean: {
            main: ["elementify"],
            zip: ["elementify.zip"]

        },

        wp_readme_to_markdown: {
            your_target: {
                files: {
                    "README.md": "readme.txt"
                }
            },
        },

        /**
         * Generate POT
         */
        makepot: {
            target: {
                options: {
                    domainPath: '/',
                    potFilename: 'languages/elementify.pot',
                    potHeaders: {
                        poedit: true,
                        'x-poedit-keywordslist': true
                    },
                    type: 'wp-plugin',
                    updateTimestamp: true
                }
            }
        },

        /**
         * Add textdomain
         */
        addtextdomain: {
            options: {
                textdomain: 'elementify',
            },
            target: {
                files: {
                    src: [
                        '*.php',
                        '**/*.php',
                        '!node_modules/**',
                        '!php-tests/**',
                        '!bin/**',
                    ]
                }
            }
        },

        /**
         * Check textdomain
         */
        checktextdomain: {
            standard: {
                options:{
                    text_domain: 'elementify', //Specify allowed domain(s)
                    keywords: [ //List keyword specifications
                        '__:1,2d',
                        '_e:1,2d',
                        '_x:1,2c,3d',
                        'esc_html__:1,2d',
                        'esc_html_e:1,2d',
                        'esc_html_x:1,2c,3d',
                        'esc_attr__:1,2d',
                        'esc_attr_e:1,2d',
                        'esc_attr_x:1,2c,3d',
                        '_ex:1,2c,3d',
                        '_n:1,2,4d',
                        '_nx:1,2,4c,5d',
                        '_n_noop:1,2,3d',
                        '_nx_noop:1,2,3c,4d'
                    ]
                },
                files: [{
                    src: [
                        '**/*.php', //all php
                        '!node_modules/**'
                    ],
                    expand: true,
                }],
            }
        },
    });

    /**
     * Load Grunt Tasks
     */
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-wp-i18n');
    grunt.loadNpmTasks('grunt-checktextdomain');

    // Generate Release package
    grunt.registerTask('release', ['clean:zip', 'copy', 'compress', 'clean:main']);

    // i18n
    grunt.registerTask('i18n', ['checktextdomain', 'addtextdomain', 'makepot']);

    grunt.util.linefeed = '\n';
};
