<?php
/**
 * [ADMIN] PetitCustomField
 *
 * @link			http://www.materializing.net/
 * @author			arata
 * @package			PetitCustomField
 * @license			MIT
 */
$formPlace = $this->request->data['PetitCustomFieldConfig']['form_place'];
?>
<?php if ($formPlace == 'top'): ?>

<?php else: ?>
<script type="text/javascript">
$(function () {
	$('#PetitCustomFieldTable').insertBefore('.submit');
});
</script>
<?php endif ?>

<div id="PetitCustomFieldTable">
<h3 id="textPetitCustomFieldTable">カスタム項目</h3>

<?php if ($fieldConfigField): ?>
<table cellpadding="0" cellspacing="0" class="form-table section">
	<?php foreach ($fieldConfigField as $keyFieldConfig => $valueFieldConfig): ?>

		<?php if ($this->PetitCustomField->judgeStatus($valueFieldConfig)): ?>
			<?php if ($valueFieldConfig['PetitCustomFieldConfigField']['field_type'] == 'wysiwyg'): ?>
				<?php // Wysiwyg の場合 ?>
				<tr>
					<th colspan="2">
						<?php echo $this->BcForm->label("PetitCustomField.{$valueFieldConfig['PetitCustomFieldConfigField']['field_name']}", $valueFieldConfig['PetitCustomFieldConfigField']['name']) ?>
						<?php if ($this->PetitCustomField->judgeShowFieldConfig($valueFieldConfig, array('field' => 'required'))): ?>&nbsp;<span class="required">*</span><?php endif ?>
					</th>
				</tr>
				<tr>
					<td class="col-input" colspan="2">
						<?php if ($this->PetitCustomField->judgeShowFieldConfig($valueFieldConfig, array('field' => 'prepend'))): ?>
							<?php echo nl2br($valueFieldConfig['PetitCustomFieldConfigField']['prepend']) ?>
						<?php endif ?>
						
						<?php echo $this->PetitCustomField->input("PetitCustomField.{$valueFieldConfig['PetitCustomFieldConfigField']['field_name']}",
							$this->PetitCustomField->getFormOption($valueFieldConfig, 'PetitCustomFieldConfigField')
						) ?>
						
						<?php if ($this->PetitCustomField->judgeShowFieldConfig($valueFieldConfig, array('field' => 'append'))): ?>
							<?php echo nl2br($valueFieldConfig['PetitCustomFieldConfigField']['append']) ?>
						<?php endif ?>
						
						<?php echo $this->BcForm->error("PetitCustomField.{$valueFieldConfig['PetitCustomFieldConfigField']['field_name']}") ?>
						<?php if ($this->PetitCustomField->judgeShowFieldConfig($valueFieldConfig, array('field' => 'description'))): ?>
							<br /><small><?php echo nl2br($valueFieldConfig['PetitCustomFieldConfigField']['description']) ?></small>
						<?php endif ?>
					</td>
				</tr>
			<?php elseif ($valueFieldConfig['PetitCustomFieldConfigField']['field_type'] == 'upload'): ?>
				<?php // アップロードの場合 ?>
				<tr>
					<th class="col-head">
						<?php echo $this->BcForm->label("PetitCustomField.{$valueFieldConfig['PetitCustomFieldConfigField']['field_name']}", $valueFieldConfig['PetitCustomFieldConfigField']['name']) ?>
						<?php if ($this->PetitCustomField->judgeShowFieldConfig($valueFieldConfig, array('field' => 'required'))): ?>&nbsp;<span class="required">*</span><?php endif ?>
					</th>
					<td class="col-input">
						<?php if ($this->PetitCustomField->judgeShowFieldConfig($valueFieldConfig, array('field' => 'prepend'))): ?>
							<?php echo nl2br($valueFieldConfig['PetitCustomFieldConfigField']['prepend']) ?>
						<?php endif ?>
						
						<?php echo $this->PetitCustomField->input("PetitCustomField.{$valueFieldConfig['PetitCustomFieldConfigField']['field_name']}",
							$this->PetitCustomField->getFormOption($valueFieldConfig, 'PetitCustomFieldConfigField')
						) ?>
						
						<?php if ($this->PetitCustomField->judgeShowFieldConfig($valueFieldConfig, array('field' => 'append'))): ?>
							<?php echo nl2br($valueFieldConfig['PetitCustomFieldConfigField']['append']) ?>
						<?php endif ?>
						
						<?php echo $this->BcForm->error("PetitCustomField.{$valueFieldConfig['PetitCustomFieldConfigField']['field_name']}") ?>
						<?php if ($this->PetitCustomField->judgeShowFieldConfig($valueFieldConfig, array('field' => 'description'))): ?>
							<br /><small><?php echo nl2br($valueFieldConfig['PetitCustomFieldConfigField']['description']) ?></small>
						<?php endif ?>
					</td>
				</tr>
			<?php else: ?>
				<?php // デフォルトのフィールド ?>
				<tr>
					<th class="col-head">
						<?php echo $this->BcForm->label("PetitCustomField.{$valueFieldConfig['PetitCustomFieldConfigField']['field_name']}", $valueFieldConfig['PetitCustomFieldConfigField']['name']) ?>
						<?php if ($this->PetitCustomField->judgeShowFieldConfig($valueFieldConfig, array('field' => 'required'))): ?>&nbsp;<span class="required">*</span><?php endif ?>
					</th>
					<td class="col-input">
						<?php if ($this->PetitCustomField->judgeShowFieldConfig($valueFieldConfig, array('field' => 'prepend'))): ?>
							<?php echo nl2br($valueFieldConfig['PetitCustomFieldConfigField']['prepend']) ?>
						<?php endif ?>
						
						<?php echo $this->PetitCustomField->input("PetitCustomField.{$valueFieldConfig['PetitCustomFieldConfigField']['field_name']}",
							$this->PetitCustomField->getFormOption($valueFieldConfig, 'PetitCustomFieldConfigField')
						) ?>

						<?php if ($this->PetitCustomField->judgeShowFieldConfig($valueFieldConfig, array('field' => 'append'))): ?>
							<?php echo nl2br($valueFieldConfig['PetitCustomFieldConfigField']['append']) ?>
						<?php endif ?>
						
						<?php echo $this->BcForm->error("PetitCustomField.{$valueFieldConfig['PetitCustomFieldConfigField']['field_name']}") ?>
						<?php if ($this->PetitCustomField->judgeShowFieldConfig($valueFieldConfig, array('field' => 'description'))): ?>
							<br /><small><?php echo nl2br($valueFieldConfig['PetitCustomFieldConfigField']['description']) ?></small>
						<?php endif ?>
					</td>
				</tr>
			<?php endif ?>
		<?php endif ?>
	
	<?php endforeach ?>
</table>
<?php endif ?>

</div>
