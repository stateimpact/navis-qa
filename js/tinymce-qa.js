(function($) {
    tinymce.create('tinymce.plugins.NavisQA', {
        /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init : function(ed, url) {
            // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
                        
            ed.addCommand('question', function() {
                var html;
                var content = ed.selection.getContent();
                var q = $('<span/>')
                        .attr('class', 'abbr')
                        .attr('title', 'question')
                        .text('Q: ');
                
                var question = $('<div/>').html(content);
                if (question.find('p').length) { 
                    // more than one graf selected
                    question.find('p').first().prepend(q);
                    question.find('p').each(function(){
                        if (! $.trim( $(this).text() ) ) {
                            $(this).remove();
                        } else {
                            $(this).addClass('question');
                        }
                    });
                    html = question.html();
                } else {
                    // just one line, so make it a p
                    question = $('<p/>').html(content)
                                .addClass('question')
                                .prepend(q);
                    html = $('<div/>').append(question).html();
                };
                
                ed.focus();
                ed.selection.setContent(html);
            });
            
            ed.addCommand('answer', function() {
                var content = ed.selection.getContent();
                var a = $('<span/>')
                        .attr('class', 'abbr')
                        .attr('title', 'answer')
                        .text('A: ');
                        
                var answer = $('<div/>')
                            .attr('class', 'answer')
                            .html(content);
                
                answer.find('p').first().prepend(a);
                
                // clear out empty tags
                answer.children().each(function() {
                    if (! $.trim( $(this).text() ) ) {
                        $(this).remove();
                    }
                });
                
                // same as above
                var html = $('<div/>').append(answer).html();
                ed.focus();
                ed.selection.setContent(html);
            });

            // Register example button
            ed.addButton('question', {
                title : 'Question',
                cmd : 'question',
                image : url + '/question.png'
            });
            
            ed.addButton('answer', {
                title : 'Answer',
                cmd : 'answer',
                image : url + '/answer.png'
            });

            // Add a node change handler, selects the button in the UI when a image is selected
            ed.onNodeChange.add(function(ed, cm, n) {
                cm.setActive('question', n.nodeName == 'IMG');
            });
        },

        /**
         * Creates control instances based in the incomming name. This method is normally not
         * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
         * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
         * method can be used to create those.
         *
         * @param {String} n Name of the control to create.
         * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
         * @return {tinymce.ui.Control} New control instance or null if no control was created.
         */
        createControl : function(n, cm) {
            return null;
        },

        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        getInfo : function() {
            return {
                longname : 'Navis Q&A',
                author : 'Chris Amico',
                authorurl : 'http://stateimpact.npr.org/',
                infourl : 'http://stateimpact.npr.org/',
                version : "1.0"
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add('navis_qa', tinymce.plugins.NavisQA);
})(window.jQuery);

