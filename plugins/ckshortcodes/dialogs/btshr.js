CKEDITOR.dialog.add('btshr', function (editor) {
					return {
						title: 'btshr',
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