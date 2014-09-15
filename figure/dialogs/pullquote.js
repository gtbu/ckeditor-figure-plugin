CKEDITOR.dialog.add( 'pullquote', function( editor ) {
    return {
        title: 'Edit Pullquote',
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
                            if ( widget.data.width !== 'xlrg' ) {
                                this.setValue( widget.data.align );
                            }
                            else {
                                //this.disable();
                            }
                            
                        },
                        commit: function( widget ) {
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
                            this.setValue( widget.data.width );
                        },
                        commit: function( widget ) {

                            widget.setData( 'width', this.getValue() );

                            if ( this.getValue() !== "xlrg" ) {
                                var alignChoice = this.getDialog().getContentElement( 'info', 'align' ).getValue();
                                if ( alignChoice === '' )
                                    widget.setData( 'align', 'rt' );
                                else
                                    widget.setData( 'align', alignChoice );
                            }
                            
                        }
                    },
                    {
                        id: 'attribution',
                        type: 'checkbox',
                        label: 'Attribution',
                        setup: function( widget ) {
                            this.setValue( widget.data.hasAttrib );
                        },
                        commit: function( widget ) {
                            widget.setData( 'hasAttrib', this.getValue() );
                        }
                    }
                ]
            }
        ]
    };
} );