CKEDITOR.dialog.add('btsrow', function (editor) {
					return {
						title: 'Row',
						minWidth: 500,
						minHeight: 150,
						resizable: false,
						contents: [
							{
								id : 'tab1',
								label : 'First Tab',
								title : 'First Tab',
								elements :[]
							}
						]
					};
				});