( function() {

    /* This plugin supports 3 types of widgets: 
        1. figure: an image or video with caption and/or credit
        2. sidebar: a small embedded piece of content that functions as a mini-article
        3. pullquote: a small snippet of text
    */

    var templates = {
        'figure':
            '<figure class="rt med" role="img">' +
                '<img src=" " alt="img" />' +
                '<figcaption class="hi-cap">Credit</figcaption><figcaption>Caption</figcaption>' +
            '</figure>',
        'sidebar':
            '<aside class="inlay rt med">' +
                '<h3>Title</h3>' +
                '<p>Content...</p>' +
            '</aside>',
        'pullquote':
            '<aside class="inlay lt med pullquote">' +
                'Type the text here' +
            '</aside>',
    };

    var sizes = {
        'sm':'Small',
        'med-sm':'Medium-Small',
        'med':'Medium',
        'med-lrg':'Medium-Large',
        'lrg':'Large',
        'xlrg':'Extra-large'
    };

    var positions = {
        'lt':'Left',
        'ct':'Center',
        'rt':'Right'
    };

    CKEDITOR.plugins.add( 'figure', {
        requires: 'widget',

        // initialize the icons for the button associated with each widget
        icons: 'figure,sidebar,pullquote,positionleft,positioncenter,positionright',

        init: function ( editor ) {
            //TODO: further modularize widget definition
            //var figure = widgetDef( editor );

            editor.widgets.add( 'figure', {

                //initialize primary widget button. Uses icon defined in plugin
                button: 'Create a figure',

                //specify which dialog box should pop-up when the widget command is executed
                dialog: 'figure',

                template: templates.figure,

                /*
                parts: {
                    */
                    /*
                    figurebody: {
                        selector: 'figure',
                        allowedContent: 'img[!src,alt]; figcaption em strong u s sub sup a[href,name]'
                    },
                    */
                    /*
                    credit: {
                        selector: 'figcaption.hi-cap',
                    },
                    caption: {
                        selector: 'figcaption:not(.hi-cap)',
                    },
                    img: {
                        selector: 'img',
                    }
                },
                */

                editables: {
                    // Not yet sure if we're going to support other elements within figures
                    /*
                    figurebody: {
                        selector: 'figure',
                        allowedContent: 'img[!src,alt]; figcaption em strong u s sub sup a[href,name]'
                    },
                    
                    lightbox: {
                        selector: 'div.ai',
                        allowedContent: 'div(ai),figcaption(hi-cap)'
                    },
                    */
                    credit: {
                        selector: 'figcaption.hi-cap',
                        allowedContent: 'em strong s sub sup a[href,name];'
                    },
                    caption: {
                        selector: 'figcaption:not(.hi-cap)',
                        //allowedContent: 'br em strong sub sup u s; a[!href]'
                        allowedContent: 'em strong s sub sup; a[href,name]; p h2 h3 h4 h5 h6(*);'
                    },
                    img: {
                        selector: 'img',
                        allowedContent: 'a[!href,rel](*); img[!src,alt](*);'
                    },
                    /*
                    iframe: {
                        selector: 'iframe',
                        allowedContent: 'iframe[*](*);'
                    }
                    */
                    credit2: {
                        selector: 'figcaption.hi-cap:nth-of-type(2), div.ai:nth-of-type(2) figcaption.hi-cap',
                        allowedContent: 'em strong s sub sup a[href,name];'
                    },
                    caption2: {
                        selector: 'figcaption:not(.hi-cap):nth-of-type(2), div.ai:nth-of-type(2) figcaption:not(.hi-cap)',
                        //allowedContent: 'br em strong sub sup u s; a[!href]'
                        allowedContent: 'em strong s sub sup; a[href,name]; p h2 h3 h4 h5 h6(*);'
                    },
                    img2: {
                        selector: 'a:nth-of-type(2) img, img:nth-of-type(2)',
                        allowedContent: 'a[!href,rel](*); img[!src,alt](*);'
                    },
                    credit3: {
                        selector: 'figcaption.hi-cap:nth-of-type(3), div.ai:nth-of-type(3) figcaption.hi-cap',
                        allowedContent: 'em strong s sub sup a[href,name];'
                    },
                    caption3: {
                        selector: 'figcaption:not(.hi-cap):nth-of-type(3), div.ai:nth-of-type(3) figcaption:not(.hi-cap)',
                        //allowedContent: 'br em strong sub sup u s; a[!href]'
                        allowedContent: 'em strong s sub sup; a[href,name]; p h2 h3 h4 h5 h6(*);'
                    },
                    img3: {
                        selector: 'a:nth-of-type(3) img, img:nth-of-type(3)',
                        allowedContent: 'a[!href,rel](*); img[!src,alt](*);'
                    },
                    credit4: {
                        selector: 'figcaption.hi-cap:nth-of-type(4), div.ai:nth-of-type(4) figcaption.hi-cap',
                        allowedContent: 'em strong s sub sup a[href,name];'
                    },
                    caption4: {
                        selector: 'figcaption:not(.hi-cap):nth-of-type(4), div.ai:nth-of-type(4) figcaption:not(.hi-cap)',
                        //allowedContent: 'br em strong sub sup u s; a[!href]'
                        allowedContent: 'em strong s sub sup; a[href,name]; p h2 h3 h4 h5 h6(*);'
                    },
                    img4: {
                        selector: 'a:nth-of-type(4) img, img:nth-of-type(4)',
                        allowedContent: 'a[!href,rel](*); img[!src,alt](*);'
                    },
                    credit5: {
                        selector: 'figcaption.hi-cap:nth-of-type(5), div.ai:nth-of-type(5) figcaption.hi-cap',
                        allowedContent: 'em strong s sub sup a[href,name];'
                    },
                    caption5: {
                        selector: 'figcaption:not(.hi-cap):nth-of-type(4), div.ai:nth-of-type(5) figcaption:not(.hi-cap)',
                        //allowedContent: 'br em strong sub sup u s; a[!href]'
                        allowedContent: 'em strong s sub sup; a[href,name]; p h2 h3 h4 h5 h6(*);'
                    },
                    img5: {
                        selector: 'a:nth-of-type(5) img, img:nth-of-type(5)',
                        allowedContent: 'a[!href,rel](*); img[!src,alt](*);'
                    }
                },

                allowedContent:
                    'figure; img[!src,alt]; figcaption(hi-cap); figcaption; a[!href,rel](zoom); span(magnifier); div(ai); p(*); ol ul li (*); iframe[*](*); object[*](*)',
                    //'figure; img[!src,alt]; figcaption(hi-cap);',


                requiredContent: 'figure(*); figcaption(hi-cap)',

                upcast: function( element ) {
                    // didn't catch lightboxed captions (which are nested in div.ai)
                    // return ( element.name == 'figure' && element.getFirst('figcaption') !== null );
                    return element.name == 'figure';
                },

                init: initAlignAndWidth(),

                data: updateAlignAndWidth()

            } );

            editor.widgets.add( 'sidebar', {

                //initialize primary widget button. Uses icon defined in plugin
                button: 'Create a sidebar',

                //specify which dialog box should pop-up when the widget command is executed
                dialog: 'aside',

                template: templates.sidebar,
                
                //sidebars have basically no restrictions on what you can put inside
                editables: {
                    sidebarbody: {
                        selector: 'aside'
                    }
                },

                allowedContent:
                    'aside(!inlay);',

                requiredContent: 'aside(inlay);',

                upcast: function( element ) {
                    //pullquote have the same basic structure and classes as sidebars, so we need to filter them out.
                    return element.name == 'aside' && element.hasClass( 'inlay' ) && (element.hasClass( 'pullquote' ) === false);
                },

                init: initAlignAndWidth(),

                data: updateAlignAndWidth()

            } );

            editor.widgets.add( 'pullquote', {

                //initialize primary widget button. Uses icon defined in plugin
                button: 'Create a pullquote',

                //specify which dialog box should pop-up when the widget command is executed
                dialog: 'pullquote',

                template: templates.pullquote,
                
                //pullqoutes are heavily restricted in the content they allow
                editables: {
                    pullquote: {
                        selector: 'aside',
                        // allowedContent: 'em sub sup; div(!pq-attrib);'
                        allowedContent: 'em sub sup; span(!*);'
                        /*
                        allowedContent: {
                            'em sub sup': true,
                            '*': {
                                propertiesOnly: true,
                                classes: 'pq-attrib'
                            },
                            div : {
                                match: function( element ) {
                                    console.log(element.classes);
                                    return element.classes[ 'pq-attrib' ];
                                },
                                classes: 'pq-attrib'
                            }
                        */
                        
                    }
                    /*
                    attribution: {
                        selector: '.pq-attrib',
                        allowedContent: 'em sub sup; span(pq-attrib);'
                    }
                   */
                },
                /*
                allowedContent:
                    'aside(!inlay !pullquote sm med xlrg rt lt ct)',
                    */

                allowedContent: 'span(!*)',
                requiredContent: 'aside(inlay pullquote);',

                upcast: function( element ) {
                    return element.name == 'aside' && element.hasClass( 'inlay' ) && element.hasClass( 'pullquote' );
                },

                init: initAlignAndWidth(),

                data: updateAlignAndWidth()

            } );

            /*
            editor.widgets.add( 'youtubevid', {

                //specify which dialog box should pop-up when the widget command is executed
                dialog: 'youtube',

                editables: {
                    iframe: {
                        selector: 'iframe',
                        allowedContent: 'iframe[*](*)' 
                    }
                },

                allowedContent: 'iframe[*](*)',
                requiredContent: 'iframe[*](*)',

                upcast: function( element ) {
                    return element.name == 'iframe';
                },

                init: initAlignAndWidth(),

                data: updateAlignAndWidth()

            } );
*/

            
            // Register dialog box
            CKEDITOR.dialog.add( 'figure', this.path + 'dialogs/figure.js' );
            CKEDITOR.dialog.add( 'aside', this.path + 'dialogs/aside.js' );
            CKEDITOR.dialog.add( 'pullquote', this.path + 'dialogs/pullquote.js' );

            // Register context menu option for editing widget.
            
            if ( editor.contextMenu ) {
                //BUG: currently only appears on the widget parent element, not on child elements
                editor.addMenuGroup( 'figureGroup', 10 );

                editor.addMenuItem( 'figureItem', {
                    label: 'Figure',
                    command: 'figure',
                    group: 'figureGroup',
                    /*
                    refresh: function() {
                        var elementPath = editor.elementPath(),
                            widget = getFocusedWidget( editor );
                            //sizes = { 'sm':'Small', 'med':'Medium', 'lrg':'Large', 'xlrg':'Extra-large' };

                        if (widget){
                            console.log('item should appear');
                            this.setState( CKEDITOR.TRISTATE_ON );
                        }
                        else {
                            this.setState( CKEDITOR.TRISTATE_DISABLED );
                            return;
                        }
                    }
                    */

                } );

                editor.addMenuItem( 'asideItem', {
                    label: 'Aside',
                    command: 'aside',
                    group: 'figureGroup',
                } );

                editor.addMenuItem( 'pullquoteItem', {
                    label: 'Pullquote',
                    command: 'pullquote',
                    group: 'figureGroup',
                } );

                editor.contextMenu.addListener( function( element ) {
                    var widget = getFocusedWidget( editor );
                    if ( widget ) {
                        //console.log('item should appear');
                        if ( widget.name === 'figure' )
                            return { figureItem: CKEDITOR.TRISTATE_OFF };
                        else if ( widget.name === 'sidebar' )
                            return { asideItem: CKEDITOR.TRISTATE_OFF };
                        else if ( widget.name === 'pullquote' )
                            return { pullquoteItem: CKEDITOR.TRISTATE_OFF };
                    }
                });
            }

            function positionCommand( editor, name, value ) {
                this.editor = editor;
                this.name = name;
                this.value = value;
                //this.context = 'p'; don't think we need this

                var classes = editor.config.positionClasses;
                    //blockTag = editor.config.enterMode == CKEDITOR.ENTER_P ? 'p' : 'div';


                if ( classes ) {
                    switch ( value ) {
                        case 'left':
                            this.cssClassName = classes[ 0 ];
                            break;
                        case 'center':
                            this.cssClassName = classes[ 1 ];
                            break;
                        case 'right':
                            this.cssClassName = classes[ 2 ];
                            break;
                    }

                    // this.cssClassRegex = new RegExp( '(?:^|\\s+)(?:' + classes.join( '|' ) + ')(?=$|\\s)' );
                    // this.requiredContent = blockTag + '(' + this.cssClassName + ')';
                }
                /*
                else
                    this.requiredContent = blockTag + '{text-align}';
                */

                this.allowedContent = {
                    // 'h1 h2 h3 h4 h5 h6 p pre td th li': {
                    'img iframe figure aside div': {
                        // Do not add elements, but only text-align style if element is validated by other rule.
                        //propertiesOnly: true,
                        //styles: this.cssClassName ? null : 'text-align',
                        classes: this.cssClassName
                    }
                };

                // In enter mode BR we need to allow here for div, because when non other
                // feature allows div justify is the only plugin that uses it.
                // if ( editor.config.enterMode == CKEDITOR.ENTER_BR )
                    // this.allowedContent.div = true;
            }

            positionCommand.prototype = {
                
                
                init: function( editor ) {

                    this.setState( CKEDITOR.TRISTATE_DISABLED );
                    //console.log(this.blobtown);
                },
                

                exec: function( editor ) {
                },

                refresh: function() {
                    /*
                    var elementPath = editor.elementPath(),
                    */

                    var widget = getFocusedWidget( editor );
                    if (widget == null) {
                        this.setState( CKEDITOR.TRISTATE_DISABLED );
                    }
                }
            };

            var left = new positionCommand( editor, 'positionleft', 'left' ),
                center = new positionCommand( editor, 'positioncenter', 'center' ),
                right = new positionCommand( editor, 'positionright', 'right' );
            
            editor.addCommand( 'positionleft', left );
            editor.addCommand( 'positioncenter', center );
            editor.addCommand( 'positionright', right );

            if ( editor.ui.addButton ) {
                editor.ui.addButton( 'PositionLeft', {
                    label: 'Position Left',
                    command: 'positionleft',
                    toolbar: 'position,10'
                } );
                editor.ui.addButton( 'PositionCenter', {
                    label: 'Position Center',
                    command: 'positioncenter',
                    toolbar: 'position,20'
                } );
                editor.ui.addButton( 'PositionRight', {
                    label: 'Position Right',
                    command: 'positionright',
                    toolbar: 'position,30'
                } );
            }
            
            
            // Register dropdown for selecting widget size
            if ( editor.ui.addRichCombo ) {
                editor.ui.addRichCombo( 'Size', {
                    label: 'Size',
                    title: 'Size',
                    toolbar: 'styles,10',
                    /*
                    Replaced with plugin-wide var
                    sizes: {
                        'sm':'Small',
                        'med':'
                        ium',
                        'lrg':'Large',
                        'xlrg':'Extra-large'
                    },
                    */

                    panel: {
                        // use the default styles for a dropdown
                        css: [ CKEDITOR.skin.getPath( 'editor' ) ].concat( editor.config.contentsCss ),
                        multiSelect: false,
                        attributes: { 'aria-label': 'size' }
                    },

                    init: function() {
                        this.startGroup( 'Size' );

                        for (var size in sizes) {
                            this.add( size, sizes[size]);
                        }

                        //this.setValue('sm');
                        this.setState( CKEDITOR.TRISTATE_DISABLED );
                    },

                    onClick: function( value ) {
                        var widget = getFocusedWidget( editor );

                        if (!widget) {
                            return;
                        }
                        else {
                            editor.focus();
                            editor.fire( 'saveSnapshot' );
                            widget.setData('width', value);
                            this.setValue(value, sizes[value]);
                            /*
                            var style = styles[ value ],
                                elementPath = editor.elementPath();

                            editor[ style.checkActive( elementPath, editor ) ? 'removeStyle' : 'applyStyle' ]( style );
                            */
                            // Save the undo snapshot after all changes are affected. (#4899)
                            setTimeout( function() {
                                editor.fire( 'saveSnapshot' );
                            }, 0 );
                        }
                    },

                    refresh: function() {
                        var elementPath = editor.elementPath(),
                            widget = getFocusedWidget( editor );

                        if (widget){
                            //console.log(widget.data.width);
                            this.setValue(widget.data.width, sizes[widget.data.width]);
                        }
                        else {
                            this.setState( CKEDITOR.TRISTATE_DISABLED );
                            return;
                        }
                    }

                } );
            }

        },

        afterInit: function( editor ) {
            // Integrate with align commands (justify plugin).
            var align = { left: 1, right: 1, center: 1, block: 1 },
                integrate = alignCommandIntegrator( editor );

            for ( var value in align ) {
                integrate( value );
            }
        }
    } );

    function initAlignAndWidth() {
        return function() {
            /*
            for (var size in sizes) {
                if ( this.element.hasClass( size ) )
                    this.setData( 'width', size );
                    if ( size === 'xlrg' )
            }
            */

            if ( this.element.hasClass( 'sm' ) )
                this.setData( 'width', 'sm' );
            else if ( this.element.hasClass( 'med-sm' ) )
                this.setData( 'width', 'med-sm' );
            else if ( this.element.hasClass( 'med' ) )
                this.setData( 'width', 'med' );
            else if ( this.element.hasClass( 'med-lrg' ) )
                this.setData( 'width', 'med-lrg' );
            else if ( this.element.hasClass( 'lrg' ) )
                this.setData( 'width', 'lrg' );
            else if ( this.element.hasClass( 'xlrg' ) || this.name === 'youtubevid') {
                this.setData( 'width', 'xlrg' );
                this.setData( 'align', null );
            }
            else if ( !this.element.hasAscendant( 'aside' ) )
                this.setData( 'width', 'med');
            else
                this.setData( 'width', null );

            if ( this.element.hasClass( 'lt' ) )
                this.setData( 'align', 'lt' );
            else if ( this.element.hasClass( 'rt' ) )
                this.setData( 'align', 'rt' );
            else if ( this.element.hasClass( 'ct' ) )
                this.setData( 'align', 'ct' );
            else
                if ( this.element.hasClass( 'xlrg' ) || this.name === 'youtubevid' || this.element.hasAscendant( 'aside' ) )
                    this.setData( 'align', null );
                else
                    this.setData( 'align', 'rt');
            /* Moved to CSS
            if ( this.element.hasClass( 'pullquote' ) && this.element.hasClass( 'rt' ) && this.element.hasClass( 'sm' ) ) {
                this.removeClass( 'centered' );
                this.addClass( 'rjust' );
            }

            else if ( this.element.hasClass( 'pullquote' ) && this.element.hasClass( 'xlrg' ) )
                this.addClass( 'centered' );
            */
            this.setData('hasCredit', false);
            this.setData('hasCaption', false);
            this.setData('hasAttrib', false);

            findCaptionsCredits(this);
            findAttributions(this);

            function findCaptionsCredits(fig) {
                var figcaptions = fig.element.find('figcaption');
                //console.log( figcaptions );
                for ( var i = 0; i < figcaptions.count(); i++ ) {
                    //console.log(figcaptions.getItem(i)); 
                    if (figcaptions.getItem(i).hasClass( 'hi-cap' ) ) {
                        //console.log('hasCredit');
                        fig.setData('hasCredit', true);
                    }
                    else {
                        //console.log('hasCaption');
                        fig.setData('hasCaption', true);
                    }
                }
            }

            function findAttributions(pq) {
                var attrib = pq.element.find('span');
                
                //console.log(figcaptions.getItem(i)); 
                if ( attrib.count() > 0 ) {
                    //console.log( attrib );
                    //console.log( attrib.getItem(0) );
                    if ( attrib.getItem(0).hasClass( 'pq-attrib' ) ) {
                        pq.setData('hasAttrib', true);
                    }
                }
            }

            this.on( 'focus', function() {
                //console.log('you just focused a widget!');
                if (this.name !== 'figure')
                    this.editor.getCommand('figure').setState( CKEDITOR.TRISTATE_DISABLED );
                if (this.name !== 'sidebar')
                    this.editor.getCommand('sidebar').setState( CKEDITOR.TRISTATE_DISABLED );
                if (this.name !== 'pullquote')
                    this.editor.getCommand('pullquote').setState( CKEDITOR.TRISTATE_DISABLED );
                this.editor.getCommand('positionleft').refresh( this.editor, this.editor.elementPath() );
                this.editor.getCommand('positionright').refresh( this.editor, this.editor.elementPath() );
                this.editor.getCommand('positioncenter').refresh( this.editor, this.editor.elementPath() );
            } );

            this.on( 'deselect', function() {
                this.editor.getCommand('positionleft').refresh( this.editor, this.editor.elementPath() );
                this.editor.getCommand('positionright').refresh( this.editor, this.editor.elementPath() );
                this.editor.getCommand('positioncenter').refresh( this.editor, this.editor.elementPath() );
            } );

        };
    }

    function updateAlignAndWidth() {
        return function() {
            for (var position in positions) {
                this.element.removeClass( position );
            }
            /*
            this.element.removeClass( 'lt' );
            this.element.removeClass( 'rt' );
            this.element.removeClass( 'ct' );
            */
            if ( this.data.align && this.data.width !== 'xlrg')
                this.element.addClass( this.data.align );

            for (var size in sizes) {
                this.element.removeClass( size );
            }
            /*
            this.element.removeClass( 'sm' );
            this.element.removeClass( 'med' );
            this.element.removeClass( 'lrg' );
            this.element.removeClass( 'xlrg' );
            */
            if ( this.data.width ) {
                this.element.addClass( this.data.width );
                this.editor.getCommand('positionleft').refresh( this.editor, this.editor.elementPath() );
                this.editor.getCommand('positionright').refresh( this.editor, this.editor.elementPath() );
                this.editor.getCommand('positioncenter').refresh( this.editor, this.editor.elementPath() );
                if ( !this.data.align && this.data.width !== 'xlrg' && !this.element.hasAscendant( 'aside' ) )
                    this.element.addClass( 'rt' );
            }
            else if ( !this.element.hasAscendant( 'aside' ) )
                this.element.addClass( 'med' );


            /* Moved to CSS
            if ( this.element.hasClass( 'pullquote' ) ) {
                
                if ( this.data.width !== 'sm' || this.data.align !== 'rt' )
                    this.element.removeClass( 'rjust' );
                else if ( !this.element.hasClass( 'rjust') && this.data.width == 'sm' && this.data.align == 'rt' ) {
                    this.element.removeClass( 'centered' );
                    this.element.addClass( 'rjust' );
                }


                if ( this.data.width == 'xlrg' &&  !this.element.hasClass( 'centered' ) )
                    this.addClass( 'centered' );
                
            }
            */

            
            /*
                if ( this.data.width === 'xlrg' )
                    this.element.removeClass( 'lt' );
                    this.element.removeClass( 'rt' );
                    this.element.removeClass( 'ct' );
             */

            function removeCaptionsCredits(fig, type) {
                var figcaptions = fig.element.find('figcaption');
                for ( var i = 0; i < figcaptions.count(); i++ ) {
                    //console.log(figcaptions.getItem(i)); 
                    if ( type === 'credit' && figcaptions.getItem(i).hasClass( 'hi-cap' ) ) {
                        figcaptions.getItem(i).remove();
                    }
                    else if ( type === 'caption' && !figcaptions.getItem(i).hasClass( 'hi-cap' ) ) {
                        figcaptions.getItem(i).remove();
                    }
                }
                return;
            }

            function removeAttribution(pq) {
                var attrib = pq.element.find('span');
                if ( attrib.count() > 0) {
                    //console.log('I should remove the attribution');
                    if ( attrib.getItem(0).hasClass( 'pq-attrib' ) ) {
                        attrib.getItem(0).remove();
                    }
                }
            }

            if ( !this.data.hasCredit) {
                removeCaptionsCredits(this, 'credit');
            }

            if ( !this.data.hasCaption ) {
                removeCaptionsCredits(this, 'caption');
            }

            if ( !this.data.hasAttrib ) {
                removeAttribution(this);
            }

            function hasCaptionsCredits(fig, type) {
                var figcaptions = fig.element.find('figcaption');
                for ( var i = 0; i < figcaptions.count(); i++ ) {
                    //console.log(figcaptions.getItem(i)); 
                    if ( type === 'credit' && figcaptions.getItem(i).hasClass( 'hi-cap' ) ) {
                        return true;
                    }
                    else if ( type === 'caption' && !figcaptions.getItem(i).hasClass( 'hi-cap' ) ) {
                        return true;
                    }
                }
                return false;
            }

            function hasAttribution(pq) {
                var attrib = pq.element.find('span');
                if ( attrib.count() > 0 ) {
                    if ( attrib.getItem(0).hasClass( 'pq-attrib' ) ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }

            function addCredit(fig) {
                var images = fig.element.find('img');
                    
                for ( var i = 0; i < images.count(); i++ ) {
                    var newCredit = CKEDITOR.dom.element.createFromHtml( '<figcaption class="hi-cap">Credit</figcaption>' );
                    newCredit.insertAfter(images.getItem(i));
                }
                fig.initEditable('credit',{
                    selector: 'figcaption.hi-cap',
                    allowedContent: 'em strong s sub sup a[href,name]'
                });
            }

            if ( this.data.hasCredit && !hasCaptionsCredits(this, 'credit') ) {
                addCredit(this);
            }

            function addCaption(fig, prior) {
                var priors = fig.element.find(prior);
                for ( var i = 0; i < priors.count(); i++ ) {
                    var newCaption = CKEDITOR.dom.element.createFromHtml( '<figcaption>Caption</figcaption>' );
                    newCaption.insertAfter(priors.getItem(i));
                }
                fig.initEditable('caption',{
                    selector: 'figcaption:not(.hi-cap)',
                    allowedContent: 'em strong s sub sup a[href,name]'
                });
            }

            if ( this.data.hasCaption && !hasCaptionsCredits(this, 'caption') ) {
                if ( this.data.hasCredit && hasCaptionsCredits(this, 'credit') )
                    addCaption(this, 'figcaption');
                else
                    addCaption(this, 'img');
            }

            function addAttribution(pq) {
                var newAttribution = CKEDITOR.dom.element.createFromHtml( '<span class="pq-attrib">&mdash;Person&rsquo;s Name of Company</span>' );
                newAttribution.appendTo(pq.element);
            }

            if ( this.data.hasAttrib && !hasAttribution(this) ) {
                addAttribution(this);
            }
        };
    }

    // Integrates widget alignment setting with justify
    // plugin's commands (execution and refreshment).
    // @param {CKEDITOR.editor} editor
    // @param {String} value 'left', 'right', 'center' or 'block'
    function alignCommandIntegrator( editor ) {
        var execCallbacks = [],
            enabled;


        return function( value ) {
            var command = editor.getCommand( 'position' + value ),
                alignments = { 'right': 'rt', 'left': 'lt', 'center': 'ct' };

            //console.log( 'justify' + value );

            // Most likely, the justify plugin isn't loaded.
            if ( !command )
                return;

            // This command will be manually refreshed along with
            // other commands after exec.
            execCallbacks.push( function() {
                command.refresh( editor, editor.elementPath() );
            } );

            if ( value in alignments ) {
                command.on( 'exec', function( evt ) {
                    var widget = getFocusedWidget( editor );

                    //console.log(value);
                    if ( widget ) {
                        widget.setData( 'align', alignments[value] );
                        //widget.setData( 'align', value );
                        /*
                        var classes = CKEDITOR.tools.clone( widget.data.classes );
                        if ( classes ){
                            delete classes.rt;
                            delete classes.lt;
                            delete classes.ct;
                        }
                        */
                        /*
                        if (value === "left") {
                            widget.setData( 'align', 'lt' );
                        }

                        if (value === "center") {
                            widget.setData( 'align', 'ct' );
                        }

                        if (value === "right") {
                            widget.setData( 'align', 'rt' );
                        }
                        */
                        /*
                        widget.setData( 'classes', classes );
                        */

                        // Once the widget changed its align, all the align commands
                        // must be refreshed: the event is to be cancelled.
                        for ( var i = execCallbacks.length; i--; )
                            execCallbacks[ i ]();

                        evt.cancel();
                    }
                } );
            }

            command.on( 'refresh', function( evt ) {
                var widget = getFocusedWidget( editor ),
                    allowed = alignments;
                
                //console.log('alignments refreshed');
                /*
                if ( getFocusedWidget( editor ) ) {
                    console.log('This is a widget!');
                }
                else {
                    console.log('Aint no widget here!');
                    return;
                }
                */
                

                // Cache "enabled" on first use. This is because filter#checkFeature may
                // not be available during plugin's afterInit in the future — a moment when
                // alignCommandIntegrator is called.
                /*
                if ( enabled === undefined )
                    enabled = 'right';
                */
                               
                if ( !widget || widget.data.width === 'xlrg' ) {
                    //console.log('turn off alignments');
                    this.setState( CKEDITOR.TRISTATE_DISABLED );
                    return;
                }
                    
                // Don't allow justify commands when widget alignment is disabled (#11004).
                /*
                if ( !enabled )
                    this.setState( CKEDITOR.TRISTATE_DISABLED );
                else {
                    }
                    */
                this.setState(
                    ( widget.data.align === alignments[value] ) ?
                            CKEDITOR.TRISTATE_ON
                        :
                            ( value in allowed ) ?
                                    CKEDITOR.TRISTATE_OFF
                                :
                                    CKEDITOR.TRISTATE_DISABLED );

                evt.cancel();
            } );
        };
    }


    // Returns the focused widget, if of the type specific for this plugin.
    // If no widget is focused, `null` is returned.
    //
    // @param {CKEDITOR.editor}
    // @returns {CKEDITOR.plugins.widget}
    function getFocusedWidget( editor ) {
        var widget = editor.widgets.focused,
            container = editor.widgets.widgetHoldingFocusedEditable;

        if (widget)
            //console.log(widget.name);

        if ( widget && ( widget.name === 'figure' || 'sidebar' || 'pullquote' ) ) {
            //console.log(widget.name);
            return widget;
        }
        else if ( container && ( container.name === 'figure' || 'sidebar' || 'pullquote' ) ) {
            //console.log(container.name);
            return container;
        }
        else {
            //console.log('what, no widget?');
            return null;
        }
    }

} )();