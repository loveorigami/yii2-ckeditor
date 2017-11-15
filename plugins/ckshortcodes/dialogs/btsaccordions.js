CKEDITOR.dialog.add('btsaccordions', function (editor) {
					return {
						title: 'Accordions',
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