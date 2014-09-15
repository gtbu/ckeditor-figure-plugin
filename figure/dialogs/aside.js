CKEDITOR.dialog.add( 'aside', function( editor ) {
    return {
        title: 'Edit Sidebar/Pullquote',
        minWidth: 200,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'align',
                        type: 'select',
                        label: 'Align',
                        items: [
                            [ 'left', 'lt' ],
                            [ 'right', 'rt' ],
                            [ 'center', 'ct' ]
                        ],
                        setup: function( widget ) {
                            /*
                            var classes = CKEDITOR.tools.clone( widget.data.classes );
                            if (classes) {
                                if (classes.rt) {
                                    this.setValue( 'rt' );
                                }
                                else if (classes.ct) {
                                    this.setValue( 'ct' );
                                }
                                else {
                                    this.setValue( 'lt' );
                                }
                            }
                            */
                            if ( widget.data.width !== 'xlrg' ) {
                                this.setValue( widget.data.align );
                            }
                            else {
                                //this.disable();
                            }
                            
                        },
                        commit: function( widget ) {
                            /*
                            var classes = CKEDITOR.tools.clone( widget.data.classes );
                            if ( classes ){
                                delete classes.rt;
                                delete classes.lt;
                                delete classes.ct;
                            }
                            classes[this.getValue()] = 1;

                            widget.setData( 'classes', classes );
                            */
                            if ( widget.data.width !== 'xlrg' ) {
                                widget.setData( 'align', this.getValue() );
                            }
                            else {
                                widget.setData( 'align', null );
                            }
                        }
                    },
                    {
                        id: 'width',
                        type: 'select',
                        label: 'Width',
                        items: [
                            [ 'small', 'sm' ],
                            [ 'medium-small', 'med-sm' ],
                            [ 'medium', 'med' ],
                            [ 'medium-large', 'med-lrg' ],
                            [ 'large', 'lrg' ],
                            [ 'extra-large', 'xlrg' ]
                        ],
                        setup: function( widget ) {
                            /*
                            var classes = CKEDITOR.tools.clone( widget.data.classes );

                            if ( classes.sm ) {
                                this.setValue( 'sm' );
                            }
                            else if ( classes.med ) {
                                this.setValue( 'med' );
                            }
                            else if ( classes.lrg ) {
                                this.setValue( 'lrg' );
                            }
                            else if ( classes.xlrg ) {
                                this.setValue( 'xlrg' );
                            }
                            else {
                                this.setValue( 'med' );
                            }
                            */
                            
                            this.setValue( widget.data.width );
                            //console.log(this);
                            
                            /* if ( widget.data.width === 'xlrg' ) {
                                this.on( 'change', function( evt ) {
                                    console.log('width changed!');
                                    if ( this.getValue() !== 'xlrg') {
                                        this.getDialog().getContentElement( 'info', 'align' ).enable();
                                        evt.removeListener();
                                    }
                                });
                            } */
                           
                        },
                        commit: function( widget ) {
                            /*
                            var classes = CKEDITOR.tools.clone( widget.data.classes );
                            delete classes.sm;
                            delete classes.med;
                            delete classes.lrg;
                            delete classes.xlrg;
                            if ( this.getValue() === "xlrg" ) {
                                delete classes.lt;
                                delete classes.rt;
                            }
                            classes[this.getValue()] = 1;

                            widget.setData( 'classes', classes );
                            */
                            widget.setData( 'width', this.getValue() );

                            if ( this.getValue() !== "xlrg" ) {
                                var alignChoice = this.getDialog().getContentElement( 'info', 'align' ).getValue();
                                if ( alignChoice === '' )
                                    widget.setData( 'align', 'rt' );
                                else
                                    widget.setData( 'align', alignChoice );
                            }
                            
                        }
                    }
                ]
            }
        ]
    };
} );