( function() {

    var templates = {
        'figure':
            '<figure class="rt med">' +
                '<img src=" " alt="img" />' +
                '<figcaption class="hi-cap">Credit</figcaption><figcaption>Caption</figcaption>' +
            '</figure>',
        'sidebar':
            '<aside class="inlay rt med">' +
                '<h3>Title</h3>' +
                '<p>Content...</p>' +
            '</aside>',
        'pullquote':
            '<aside class="inlay rt med pullquote">' +
                'Type the text here' +
            '</aside>'
    };

    CKEDITOR.plugins.add( 'figure', {
        requires: 'widget',

        icons: 'figure',

        init: function ( editor ) {
            //var figure = widgetDef( editor );

            editor.widgets.add( 'figure', {

                button: 'Create a figure',
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
                    /*
                    figurebody: {
                        selector: 'figure',
                        allowedContent: 'img[!src,alt]; figcaption em strong u s sub sup a[href,name]'
                    },
                    */
                    credit: {
                        selector: 'figcaption.hi-cap',
                        allowedContent: 'em strong s sub sup a[href,name]'
                    },
                    caption: {
                        selector: 'figcaption:not(.hi-cap)',
                        allowedContent: 'em strong s sub sup a[href,name]'
                    },
                    img: {
                        selector: 'img',
                        allowedContent: 'img[!src,alt]'
                    }
                },

                allowedContent:
                    'figure; img[!src,alt]; figcaption(hi-cap)',
                /*
                disallowedContent: 'em strong u s sub sup a[href,name]',
                */

                requiredContent: 'figure(*); figcaption(hi-cap)',

                upcast: function( element ) {
                    return ( element.name == 'figure' && element.getFirst('figcaption') !== null ) || element.name == 'iframe';
                },

                init: initAlignAndWidth(),

                data: updateAlignAndWidth()

            } );

            editor.widgets.add( 'sidebar', {

                button: 'Create a sidebar',
                dialog: 'figure',

                template: templates.sidebar,
        
                editables: {
                    sidebarbody: {
                        selector: 'aside'
                    }
                },

                allowedContent:
                    'aside(!inlay);',

                requiredContent: 'aside(inlay);',

                upcast: function( element ) {
                    return element.name == 'aside' && element.hasClass( 'inlay' ) && (element.hasClass( 'pullquote' ) === false);
                },

                init: initAlignAndWidth(),

                data: updateAlignAndWidth()

            } );

            editor.widgets.add( 'pullquote', {

                button: 'Create a pullquote',
                dialog: 'figure',

                template: templates.pullquote,
        
                editables: {
                    pullquote: {
                        selector: 'aside',
                        allowedContent: 'em strong'
                    }
                },
                
                allowedContent:
                    'aside(!inlay !pullquote);',
/*
                disallowedContent: 'u s a',
                */

                requiredContent: 'aside(inlay pullquote);',

                upcast: function( element ) {
                    return element.name == 'aside' && element.hasClass( 'inlay' ) && element.hasClass( 'pullquote' );
                },

                init: initAlignAndWidth(),

                data: updateAlignAndWidth()

            } );

            CKEDITOR.dialog.add( 'figure', this.path + 'dialogs/figure.js' );

            // Register context menu option for editing widget.
            
            if ( editor.contextMenu ) {
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

                editor.contextMenu.addListener( function( element ) {
                    if ( getFocusedWidget( editor ) ) {
                        console.log('item should appear');
                        return { figureItem: CKEDITOR.TRISTATE_OFF };
                    }
                });
            }
            
            editor.ui.addRichCombo( 'Size', {
                label: 'Size',
                title: 'Size',
                toolbar: 'styles,10',

                sizes: {
                    'sm':'Small',
                    'med':'Medium',
                    'lrg':'Large',
                    'xlrg':'Extra-large'
                },

                panel: {
                    css: [ CKEDITOR.skin.getPath( 'editor' ) ].concat( editor.config.contentsCss ),
                    multiSelect: false,
                    attributes: { 'aria-label': 'size' }
                },

                init: function() {
                    //var sizes = { 'sm':'Small', 'med':'Medium', 'lrg':'Large', 'xlrg':'Extra-large' };
                    this.startGroup( 'Size' );

                    for (var size in this.sizes) {
                        this.add( size, this.sizes[size]);
                    }
                    /*
                    this.add( 'sm', 'Small', 'Small' );
                    this.add( 'med', 'Medium' );
                    this.add( 'lrg', 'Large' );
                    this.add( 'xlrg', 'Extra-large' );
                    */

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
                        this.setValue(value, this.sizes[value]);
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
                        //sizes = { 'sm':'Small', 'med':'Medium', 'lrg':'Large', 'xlrg':'Extra-large' };

                    if (widget){
                        console.log(widget.data.width);
                        this.setValue(widget.data.width, this.sizes[widget.data.width]);
                    }
                    else {
                        this.setState( CKEDITOR.TRISTATE_DISABLED );
                        return;
                    }
                }

            } );

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
            if ( this.element.hasClass( 'sm' ) )
                this.setData( 'width', 'sm' );
            else if ( this.element.hasClass( 'med' ) )
                this.setData( 'width', 'med' );
            else if ( this.element.hasClass( 'lrg' ) )
                this.setData( 'width', 'lrg' );
            else if ( this.element.hasClass( 'xlrg' ) ) {
                this.setData( 'width', 'xlrg' );
                this.setData( 'align', null );
            }

            if ( this.element.hasClass( 'lt' ) )
                this.setData( 'align', 'lt' );
            else if ( this.element.hasClass( 'rt' ) )
                this.setData( 'align', 'rt' );
            else if ( this.element.hasClass( 'ct' ) )
                this.setData( 'align', 'ct' );
            else
                if ( this.element.hasClass( 'xlrg' ) )
                    this.setData( 'align', null );
                else
                    this.setData( 'align', 'rt');

            this.setData('hasCredit', false);
            this.setData('hasCaption', false);

            findCaptionsCredits(this);

            function findCaptionsCredits(fig) {
                var figcaptions = fig.element.find('figcaption');
                //console.log( figcaptions );
                for ( var i = 0; i < figcaptions.count(); i++ ) {
                    //console.log(figcaptions.getItem(i)); 
                    if (figcaptions.getItem(i).hasClass( 'hi-cap' ) ) {
                        console.log('hasCredit');
                        fig.setData('hasCredit', true);
                    }
                    else {
                        console.log('hasCaption');
                        fig.setData('hasCaption', true);
                    }
                }
            }
            

            /*
            if ( this.element.find('figcaption.hi-cap') )
                this.setData('hasCredit', true);
            else
                this.setData('hasCredit', false);

            if ( this.element.find('figcaption:not(.hi-cap)') !== null )
                this.setData('hasCaption', true);
            else
                this.setData('hasCaption', false);
            */

        };
    }

    function updateAlignAndWidth() {
        return function() {
            this.element.removeClass( 'lt' );
            this.element.removeClass( 'rt' );
            this.element.removeClass( 'ct' );
            if ( this.data.align && this.data.width !== 'xlrg')
                this.element.addClass( this.data.align );

            this.element.removeClass( 'sm' );
            this.element.removeClass( 'med' );
            this.element.removeClass( 'lrg' );
            this.element.removeClass( 'xlrg' );
            if ( this.data.width )
                this.element.addClass( this.data.width );
                if ( !this.data.align && this.data.width !== 'xlrg')
                    this.element.addClass( 'rt' );
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

            if ( !this.data.hasCredit) {
                removeCaptionsCredits(this, 'credit');
            }

            if ( !this.data.hasCaption ) {
                removeCaptionsCredits(this, 'caption');
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
            var command = editor.getCommand( 'justify' + value ),
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
                /*
                console.log(widget);

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
                
                if ( enabled === undefined )
                    enabled = 'right';
               
                if ( !widget )
                    return;

                // Don't allow justify commands when widget alignment is disabled (#11004).
                if ( !enabled )
                    this.setState( CKEDITOR.TRISTATE_DISABLED );
                else {
                    this.setState(
                        ( widget.data.align === alignments[value] ) ?
                                CKEDITOR.TRISTATE_ON
                            :
                                ( value in allowed ) ?
                                        CKEDITOR.TRISTATE_OFF
                                    :
                                        CKEDITOR.TRISTATE_DISABLED );
                }

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

        if ( widget && ( widget.name == 'figure' || 'sidebar' || 'pullquote' ) ) {
            return widget;
        }
        else if ( container && ( container.name == 'figure' || 'sidebar' || 'pullquote' ) ) {
            console.log(container);
            return container;
        }
        else {
            return null;
        }
    }

} )();