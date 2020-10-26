/**
 * [ADMIN] PetitCustomField
 *
 * @link			http://www.materializing.net/
 * @author			arata
 * @package			PetitCustomField
 * @license			MIT
 */
/**
 * プチカスタムフィールド用のJS処理
 */
$(function(){
	$fieldType = $("#PetitCustomFieldConfigFieldFieldType").val();
	petitCustomFieldConfigFieldFieldTypeChangeHandler($fieldType);
	// タイプを選択すると入力するフィールドが切り替わる
	$("#PetitCustomFieldConfigFieldFieldType").change(function(){
		petitCustomFieldConfigFieldFieldTypeChangeHandler($("#PetitCustomFieldConfigFieldFieldType").val());
	});
	
	// カスタムフィールド名の入力時、ラベル名が空の場合は名称を自動で入力する
	$("#PetitCustomFieldConfigFieldName").change(function(){
		$labelName = $("#PetitCustomFieldConfigFieldLabelName");
		var labelNameValue = $labelName.val();
		if(!labelNameValue){
			$labelName.val($("#PetitCustomFieldConfigFieldName").val());
		}
	});
	
	// 利用中フィールド名一覧を表示する
	$('#show_field_name_list').change(function() {
		if ($(this).prop('checked')) {
			$('#FieldNameList').show('slow');
		} else {
			$('#FieldNameList').hide();
		}
	});
	
	// カスタムフィールド名、ラベル名、フィールド名の入力時、リアルタイムで重複チェックを行う
	$("#PetitCustomFieldConfigFieldName").keyup(checkDuplicateValueChengeHandler);
	$("#PetitCustomFieldConfigFieldLabelName").keyup(checkDuplicateValueChengeHandler);
	$("#PetitCustomFieldConfigFieldFieldName").keyup(checkDuplicateValueChengeHandler);
	// 重複があればメッセージを表示する
	function checkDuplicateValueChengeHandler() {
		var fieldId = this.id;
		var options = {};
		// 本来であれば編集時のみ必要な値だが、actionによる条件分岐でビュー側に値を設定しなかった場合、
		// Controllerでの取得値が文字列での null となってしまうため、常に設定し取得している
		var foreignId = $("#ForeignId").html();
		
		switch (fieldId) {
			case 'PetitCustomFieldConfigFieldName':
				options = {
					"data[PetitCustomFieldConfigField][foreign_id]": foreignId,
					"data[PetitCustomFieldConfigField][name]": $("#PetitCustomFieldConfigFieldName").val()
				};
				break;
			case 'PetitCustomFieldConfigFieldLabelName':
				options = {
					"data[PetitCustomFieldConfigField][foreign_id]": foreignId,
					"data[PetitCustomFieldConfigField][label_name]": $("#PetitCustomFieldConfigFieldLabelName").val()
				};
				break;
			case 'PetitCustomFieldConfigFieldFieldName':
				options = {
					"data[PetitCustomFieldConfigField][foreign_id]": foreignId,
					"data[PetitCustomFieldConfigField][field_name]": $("#PetitCustomFieldConfigFieldFieldName").val()
				};
				break;
		}
		$.ajax({
			type: "POST",
			data: options,
			url: $("#AjaxCheckDuplicateUrl").html(),
			dataType: "html",
			cache: false,
			success: function(result, status, xhr) {
				if(status === 'success') {
					if(!result) {
						if (fieldId === 'PetitCustomFieldConfigFieldName') {
							$('#CheckValueResultName').show('fast');
						}
						if (fieldId === 'PetitCustomFieldConfigFieldLabelName') {
							$('#CheckValueResultLabelName').show('fast');
						}
						if (fieldId === 'PetitCustomFieldConfigFieldFieldName') {
							$('#CheckValueResultFieldName').show('fast');
						}
					} else {
						if (fieldId === 'PetitCustomFieldConfigFieldName') {
							$('#CheckValueResultName').hide('fast');
						}
						if (fieldId === 'PetitCustomFieldConfigFieldLabelName') {
							$('#CheckValueResultLabelName').hide('fast');
						}
						if (fieldId === 'PetitCustomFieldConfigFieldFieldName') {
							$('#CheckValueResultFieldName').hide('fast');
						}
					}
				}
			}
		});
	}
	
	// 編集画面のときのみ実行する（削除ボタンの有無で判定）
	if ($('#BtnDelete').html()) {
		$('#BeforeFieldName').hide();
		$("#BtnSave").click(function(){
			$beforeFieldName = $('#BeforeFieldName').html();
			$inputFieldName = $('#PetitCustomFieldConfigFieldFieldName').val();
			if ($beforeFieldName !== $inputFieldName) {
				if(!confirm('フィールド名を変更した場合、これまでの記事でこのフィールドに入力していた内容は引き継がれません。\n本当によろしいですか？')) {
					$('#BeforeFieldNameComment').css('visibility', 'visible');
					$('#BeforeFieldName').show();
					return false;
				}
			}
		});
	}
	
	// 正規表現チェックのチェック時に、専用の入力欄を表示する
	$('#PetitCustomFieldConfigFieldValidateREGEXCHECK').change(function() {
		$value = $(this).prop('checked');
		if ($value) {
			$('#PetitCustomFieldConfigFieldValidateRegexBox').show('slow');
		} else {
			$('#PetitCustomFieldConfigFieldValidateRegexBox').hide('high');
		}
	});
	
	// 正規表現入力欄が空欄になった際はメッセージを表示して入力促す
	$('#PetitCustomFieldConfigFieldValidateRegex').change(function() {
		if (!$(this).val()) {
			$('#CheckValueResultValidateRegex').show('slow');
		} else {
			$('#CheckValueResultValidateRegex').hide();
		}
	});
	
	// submit時の処理
	$("#BtnSave").click(function(){
		// 都道府県の選択値対応表は送らないようにする
		$('#PetitCustomFieldConfigFieldPreviewPrefList').attr('disabled', 'disabled');
		
		// 正規表現チェックが有効の場合に、正規表現入力欄が空の場合は submit させない
		$validateRegexCheck = $('#PetitCustomFieldConfigFieldValidateREGEXCHECK');
		if ($validateRegexCheck.prop('checked')) {
			$validateRegex = $('#PetitCustomFieldConfigFieldValidateRegex').val();
			if (!$validateRegex) {
				alert('正規表現入力欄が未入力です。');
				return false;
			}
		}
	});
	
/**
 * タイプの値によってフィールドの表示設定を行う
 * 
 * @param {string} value フィールドタイプ
 */
	function petitCustomFieldConfigFieldFieldTypeChangeHandler(value){
		$defaultValue = $("#RowPetitCustomFieldConfigFieldDefaultValue");
			$previewPrefList = $("#PreviewPrefList");
		$validateGroup = $("#RowPetitCustomFieldConfigFieldValidateGroup");
			$validateHankaku = $("#PetitCustomFieldConfigFieldValidateHANKAKUCHECK");
			$validateNumeric = $("#PetitCustomFieldConfigFieldValidateNUMERICCHECK");
			$validateNonCheckCheck = $("#PetitCustomFieldConfigFieldValidateNONCHECKCHECK");
			$validateRegex = $('#PetitCustomFieldConfigFieldValidateREGEXCHECK');
				$validateRegexBox = $('#PetitCustomFieldConfigFieldValidateRegexBox');
		$sizeGroup = $("#RowPetitCustomFieldConfigFieldSizeGroup");
			$size = $("#RowPetitCustomFieldConfigFieldSize");
			$maxLength = $("#RowPetitCustomFieldConfigFieldMaxLenght");
			$counter = $("#RowPetitCustomFieldConfigFieldCounter");
		$placeholder = $("#RowPetitCustomFieldConfigFieldPlaceholder");
		$rowsGroup = $("#RowPetitCustomFieldConfigFieldRowsGroup");
			$rows = $("#PetitCustomFieldConfigFieldRows");
			$cols = $("#PetitCustomFieldConfigFieldCols");
			$editorToolType = $("#RowPetitCustomFieldConfigFieldEditorToolType");
		$choices = $("#RowPetitCustomFieldConfigFieldChoices");
		$separator = $("#RowPetitCustomFieldConfigFieldSeparator");
		$autoConvert = $("#RowPetitCustomFieldConfigFieldAutoConvert");
		
		switch (value){
			case 'text':
				$defaultValue.show('slow');
					$previewPrefList.addClass('display-none');
				// バリデーション項目
				$validateGroup.show('slow');
					$validateHankaku.parent().show('slow');
					$validateNumeric.parent().show('slow');
					$validateNonCheckCheck.parent().hide('fast');
					$validateRegex.parent().show('slow');
						// 正規表現チェックが有効に指定されている場合は、専用の入力欄を表示する
						if ($validateRegex.prop('checked')) {
							$validateRegexBox.show('fast');
						}
				
				$sizeGroup.show('slow');
					$size.show('slow');
					$maxLength.show('slow');
					$counter.show('slow');
				$placeholder.show('slow');
				
				$rowsGroup.hide('fast');
					$rows.hide('fast');
					$cols.hide('fast');
					$editorToolType.hide('fast');
					
				$choices.hide('fast');
				$separator.hide('fast');
				$autoConvert.show('slow');
				break;
				
			case 'textarea':
				$defaultValue.show('slow');
					$previewPrefList.addClass('display-none');
				// バリデーション項目
				$validateGroup.show('slow');
					$validateHankaku.parent().show('slow');
					$validateNumeric.parent().show('slow');
					$validateNonCheckCheck.parent().hide('fast');
					$validateRegex.parent().show('slow');
						// 正規表現チェックが有効に指定されている場合は、専用の入力欄を表示する
						if ($validateRegex.prop('checked')) {
							$validateRegexBox.show('fast');
						}
				
				$sizeGroup.show('slow');
					$size.hide('fast');
					$maxLength.hide('fast');
					$counter.show('slow');
				$placeholder.show('slow');
				
				$rowsGroup.show('slow');
					$rows.show('slow');
						$rows.attr('placeholder', '3');
					$cols.show('slow');
						$cols.attr('placeholder', '40');
					$editorToolType.hide('fast');
					
				$choices.hide('fast');
				$separator.hide('fast');
				$autoConvert.show('slow');
				break;
				
			case 'date':
				$defaultValue.show('slow');
					$previewPrefList.addClass('display-none');
				// バリデーション項目
				$validateGroup.hide('fast');
					$validateHankaku.parent().hide('fast');
					$validateNumeric.parent().hide('fast');
					$validateNonCheckCheck.parent().hide('fast');
					$validateRegex.parent().hide('fast');
						$validateRegexBox.hide('fast');
				
				$sizeGroup.hide('fast');
					$size.hide('fast');
					$maxLength.hide('fast');
					$counter.hide('fast');
				$placeholder.hide('fast');
				
				$rowsGroup.hide('fast');
					$rows.hide('fast');
					$cols.hide('fast');
					$editorToolType.hide('fast');
					
				$choices.hide('fast');
				$separator.hide('fast');
				$autoConvert.hide('fast');
				break;
				
			case 'datetime':
				$defaultValue.show('slow');
					$previewPrefList.addClass('display-none');
				// バリデーション項目
				$validateGroup.hide('fast');
					$validateHankaku.parent().hide('fast');
					$validateNumeric.parent().hide('fast');
					$validateNonCheckCheck.parent().hide('fast');
					$validateRegex.parent().hide('fast');
						$validateRegexBox.hide('fast');
				
				$sizeGroup.hide('fast');
					$size.hide('fast');
					$maxLength.hide('fast');
					$counter.hide('fast');
				$placeholder.hide('fast');
				
				$rowsGroup.hide('fast');
					$rows.hide('fast');
					$cols.hide('fast');
					$editorToolType.hide('fast');
					
				$choices.hide('fast');
				$separator.hide('fast');
				$autoConvert.hide('fast');
				break;
				
			case 'select':
				$defaultValue.show('slow');
					$previewPrefList.addClass('display-none');
				// バリデーション項目
				$validateGroup.hide('fast');
					$validateHankaku.parent().hide('fast');
					$validateNumeric.parent().hide('fast');
					$validateNonCheckCheck.parent().hide('fast');
					$validateRegex.parent().hide('fast');
						$validateRegexBox.hide('fast');
				
				$sizeGroup.hide('fast');
					$size.hide('fast');
					$maxLength.hide('fast');
					$counter.hide('fast');
				$placeholder.hide('fast');
				
				$rowsGroup.hide('fast');
					$rows.hide('fast');
					$cols.hide('fast');
					$editorToolType.hide('fast');
					
				$choices.show('slow');
				$separator.hide('fast');
				$autoConvert.hide('fast');
				break;
				
			case 'radio':
				$defaultValue.show('slow');
					$previewPrefList.addClass('display-none');
				// バリデーション項目
				$validateGroup.hide('fast');
					$validateHankaku.parent().hide('fast');
					$validateNumeric.parent().hide('fast');
					$validateNonCheckCheck.parent().hide('fast');
					$validateRegex.parent().hide('fast');
						$validateRegexBox.hide('fast');
				
				$sizeGroup.hide('fast');
					$size.hide('fast');
					$maxLength.hide('fast');
					$counter.hide('fast');
				$placeholder.hide('fast');
				
				$rowsGroup.hide('fast');
					$rows.hide('fast');
					$cols.hide('fast');
					$editorToolType.hide('fast');
					
				$choices.show('slow');
				$separator.show('slow');
				$autoConvert.hide('fast');
				break;
				
			case 'checkbox':
				$defaultValue.show('slow');
					$previewPrefList.addClass('display-none');
				// バリデーション項目
				$validateGroup.hide('fast');
					$validateHankaku.parent().hide('fast');
					$validateNumeric.parent().hide('fast');
					$validateNonCheckCheck.parent().show('fast');
					$validateRegex.parent().hide('fast');
						$validateRegexBox.hide('fast');
				
				$sizeGroup.hide('fast');
					$size.hide('fast');
					$maxLength.hide('fast');
					$counter.hide('fast');
				$placeholder.hide('fast');
				
				$rowsGroup.hide('fast');
					$rows.hide('fast');
					$cols.hide('fast');
					$editorToolType.hide('fast');
					
				$choices.hide('fast');
				$separator.hide('fast');
				$autoConvert.hide('fast');
				break;
				
			case 'multiple':
				$defaultValue.show('slow');
					$previewPrefList.addClass('display-none');
				// バリデーション項目
				$validateGroup.show('slow');
					$validateHankaku.parent().hide('fast');
					$validateNumeric.parent().hide('fast');
					$validateNonCheckCheck.parent().show('slow');
					$validateRegex.parent().hide('fast');
						$validateRegexBox.hide('fast');
				
				$sizeGroup.hide('fast');
					$size.hide('fast');
					$maxLength.hide('fast');
					$counter.hide('fast');
				$placeholder.hide('fast');
				
				$rowsGroup.hide('fast');
					$rows.hide('fast');
					$cols.hide('fast');
					$editorToolType.hide('fast');
					
				$choices.show('slow');
				$separator.hide('fast');
				$autoConvert.hide('fast');
				break;
				
			case 'pref':
				$defaultValue.show('slow');
					$previewPrefList.removeClass('display-none');
					$('#PetitCustomFieldConfigFieldPreviewPrefList').removeAttr('disabled');
				// バリデーション項目
				$validateGroup.hide('fast');
					$validateHankaku.parent().hide('fast');
					$validateNumeric.parent().hide('fast');
					$validateNonCheckCheck.parent().hide('fast');
					$validateRegex.parent().hide('fast');
						$validateRegexBox.hide('fast');
				
				$sizeGroup.hide('fast');
					$size.hide('fast');
					$maxLength.hide('fast');
					$counter.hide('fast');
				$placeholder.hide('fast');
				
				$rowsGroup.hide('fast');
					$rows.hide('fast');
					$cols.hide('fast');
					$editorToolType.hide('fast');
					
				$choices.hide('fast');
				$separator.hide('fast');
				$autoConvert.hide('fast');
				break;
				
			case 'wysiwyg':
				$defaultValue.hide('fast');
					$previewPrefList.addClass('display-none');
				// バリデーション項目
				$validateGroup.hide('fast');
					$validateHankaku.parent().hide('fast');
					$validateNumeric.parent().hide('fast');
					$validateNonCheckCheck.parent().hide('fast');
					$validateRegex.parent().hide('fast');
						$validateRegexBox.hide('fast');
				
				$sizeGroup.hide('fast');
					$size.hide('fast');
					$maxLength.hide('fast');
					$counter.hide('fast');
				$placeholder.hide('fast');
				
				$rowsGroup.show('slow');
					$rows.show('slow');
						$rows.attr('placeholder', '200px');
					$cols.show('slow');
						$cols.attr('placeholder', '100%');
					$editorToolType.show('slow');
					
				$choices.hide('fast');
				$separator.hide('fast');
				$autoConvert.hide('fast');
				break;
			
			case 'upload':
				$defaultValue.hide('fast');
					$previewPrefList.addClass('display-none');
				// バリデーション項目
				$validateGroup.hide('fast');
					$validateHankaku.parent().hide('fast');
					$validateNumeric.parent().hide('fast');
					$validateNonCheckCheck.parent().hide('fast');
					$validateRegex.parent().hide('fast');
						$validateRegexBox.hide('fast');
				
				$sizeGroup.hide('fast');
					$size.hide('fast');
					$maxLength.hide('fast');
					$counter.hide('fast');
				$placeholder.hide('fast');
				
				$rowsGroup.hide('fast');
					$rows.hide('fast');
					$cols.hide('fast');
					$editorToolType.hide('fast');
					
				$choices.hide('fast');
				$separator.hide('fast');
				$autoConvert.hide('fast');
				break;
		}
	}
});


$(function(){
	$("a[rel=pcf_modal]").colorbox();

	var baseUrl = $.baseUrl + '/';
	var adminPrefix = $.bcUtil.adminPrefix;
	var uploadBaseUrl = baseUrl + adminPrefix + '/uploader/uploader_files/';
	var listItemCount = 10;
	//画像サイズの埋め込み
	$.map($(".upload-file"),function(item){
		var $elem = $(item);
		var saveurl = $(item).find(".upload-file-path").val();
		if(saveurl){
			setFileInfo($elem, saveurl);
		}
	});
	//アップロードリストの表示
	$(".upload-file-open").on("click",function(e){
		$(".upload-file").removeClass("upload-file-active");
		$(e.target).closest(".upload-file").addClass("upload-file-active");
		openUploadList();
	});
	//アップロードリストの取得
	function openUploadList(){
		$.bcUtil.ajax( uploadBaseUrl +  "ajax_list/num:" + listItemCount , openUploadModal , { type: 'GET'});
	}
	//モーダルの表示
	function openUploadModal(data){
		$("#modalViewResult").html(data);
		$('#modalView').dialog({
			height: 'auto',
			width : 780,
			modal: true,
			buttons: {
				'閉じる': function() {
				$(".upload-file-active").removeClass("upload-file-active");
				return $(this).dialog('close');
				}
			}
		});
	}
	//アップロードリストのページャー切り替え
	$('#modalView').on("click","#DivPanelList .page-numbers a",function(e){
		e.preventDefault();
		var url = $(e.target).attr("href");
		$.bcUtil.ajax(url, openUploadModal , { type: 'GET'});
	});
	//ファイルをアップロード
	$('#modalView').on("change",'#UploaderFileFile',uploaderFileFileChangeHandler);

	/**
	 * アップロードファイル選択時イベント
	 */
	function uploaderFileFileChangeHandler(){
		var url = uploadBaseUrl + 'ajax_upload/';
		var form = $(this);
		$("#Waiting").show();
		if($('#UploaderFileFile').val()){
			$.bcToken.check(function(){
				var data = {'data[_Token][key]': $.bcToken.key};
				if($("#UploaderFileUploaderCategoryId").length) {
				data = $.extend(data, {'data[UploaderFile][uploader_category_id]':$("#UploaderFileUploaderCategoryId").val()});
				}
				form.upload(url, data, uploadSuccessHandler, 'html');
			}, {useUpdate: false, hideLoader: false});
		}
	}

	/**
	 * アップロード完了後イベント
	 */
	function uploadSuccessHandler(res){
		if(res){
			openUploadList();
		}else{
			$("#Waiting").hide();
		}
		// フォームを初期化
		// セキュリティ上の関係でvalue値を直接消去する事はできないので、一旦エレメントごと削除し、
		// spanタグ内に新しく作りなおす。
		$(this).remove();
		$("#SpanUploadFile").append('<input id="UploaderFileFile'+'" type="file" value="" name="data[UploaderFile][file]" class="uploader-file-file" />');
		$('#UploaderFileFile').change(uploaderFileFileChangeHandler);
		$.bcToken.key = null;
	}

	//ファイルリストからファイル選択時
	$('#modalView').on("click",".selectable-file",function(e){
		var fileurl = $(e.target).closest(".selectable-file").find(".url").text();
		var saveurl = fileurl.replace(baseUrl ,"");
		var $activelem = $(".upload-file-active");
		$activelem.find(".upload-file-path").val(saveurl);
		$activelem.find(".upload-file-delete").show();
		setFileInfo($activelem,saveurl);
		$activelem.removeClass("upload-file-active");
		$('#modalView').dialog('close');
	});

	//選択ファイルを未選択化
	$(".upload-file-delete").on("click",function(){
		$(this).closest(".upload-file").find(".upload-select-file").empty();
		$(this).closest(".upload-file").find(".upload-file-path").val("");
		$(this).hide();
	});

	//ファイル情報をセット
	function setFileInfo($elm,saveurl){
		if(saveurl){
			var fileurl = baseUrl + saveurl;
			var extention = fileurl.split(".").pop().toLowerCase(); 
			if($.inArray(extention,["gif","png","jpg","jpeg"]) > -1){
				$("<img>").attr("src", fileurl ).bind("load", function(){
				$.colorbox.remove();
				var imgtag = '<a href="' + fileurl + '" rel="pcf_modal"><img src="' + fileurl + '" class="select-image"></a>';
				$elm.find(".upload-select-file").html(imgtag + '<p class="iteminfo"></p>');
				//サムネ画像の実際サイズをセットする
				$elm.find(".iteminfo").html('<span class="iteminfo-path iteminfo-image iteminfo-ext-' + extention + '">' + fileurl +  '</span><span class="iteminfo-size">( w' + this.naturalWidth + " × h" + this.naturalHeight + " )</span>");
				$("a[rel=pcf_modal]").colorbox();
				});
			}else{
				$elm.find(".upload-select-file").html('<p class="iteminfo"><a href="' + fileurl +  '" class="iteminfo-link" target="_blank"><span class="iteminfo-path iteminfo-file iteminfo-ext-' + extention + '">' + fileurl +  '</span></a></p>')
			}
		}
	}
});
