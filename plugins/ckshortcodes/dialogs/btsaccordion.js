CKEDITOR.dialog.add('btsaccordion', function (editor) {
					return {
						title: 'Accordion',
						minWidth: 500,
						minHeight: 150,
						resizable: false,
						contents: [
							{
								id : 'tab1',
								label : 'First Tab',
								title : 'First Tab',
								elements :[
									{
										id: 'btntitle',
										type: 'text',
										label: "Title",
										validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty." ),
										setup: function (widget) {
											this.setValue(widget.data.btntitle || '');
										},
										commit: function (widget) {
											widget.setData('btntitle', this.getValue());
										}
									},
									{
										id: 'btnicon',
										type: 'text',
										label: "Icon Bootstrap",										
										setup: function (widget) {
											this.setValue(widget.data.btnicon || '');
										},
										commit: function (widget) {
											widget.setData('btnicon', this.getValue());
										}
									},
									{
										id: 'btntext',
										type: 'text',
										label: "Text",
										validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty." ),
										setup: function (widget) {
											this.setValue(widget.data.btntext || '');
										},
										commit: function (widget) {
											widget.setData('btntext', this.getValue());
										}
									},
								]
							}
						],
						onOk: function() {
							var title = this.getValueOf('tab1', 'btntitle');
							var stext = this.getValueOf('tab1', 'btntext');
							var icon = (this.getValueOf('tab1', 'btnicon') !="") ? 'icon="'+this.getValueOf('tab1', 'btnicon')+'"' : '';
							editor.insertHtml('[accordion title="'+title+'" '+ icon +']'+stext+'[/accordion]');
							// editor.insertText('[alerts type="'+type+'"]'+message+'[/alerts]');
						}
					};
				});