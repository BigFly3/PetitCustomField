<?php
/**
 * [ADMIN] PetitCustomField
 *
 * @link			http://www.materializing.net/
 * @author			arata
 * @package			PetitCustomField
 * @license			MIT
 */
$classies = array();
if (!$this->PetitCustomField->allowPublish($data, 'PetitCustomFieldConfig')) {
	$classies = array('unpublish', 'disablerow');
} else {
	$classies = array('publish');
}
$class=' class="'.implode(' ', $classies).'"';
?>
<tr<?php echo $class ?>>
	<td class="row-tools">
	<?php $this->BcBaser->link($this->BcBaser->getImg('admin/icn_tool_unpublish.png', array('width' => 24, 'height' => 24, 'alt' => 'フィールドグループを無効化', 'class' => 'btn')),
			array('action' => 'ajax_unpublish', $data['PetitCustomFieldConfig']['id']), array('title' => 'フィールドグループを無効化', 'class' => 'btn-unpublish')) ?>
	<?php $this->BcBaser->link($this->BcBaser->getImg('admin/icn_tool_publish.png', array('width' => 24, 'height' => 24, 'alt' => 'フィールドグループを有効化', 'class' => 'btn')),
			array('action' => 'ajax_publish', $data['PetitCustomFieldConfig']['id']), array('title' => 'フィールドグループを有効化', 'class' => 'btn-publish')) ?>

	<?php $this->BcBaser->link($this->BcBaser->getImg('admin/icn_tool_manage.png', array('width' => 24, 'height' => 24, 'alt' => 'フィールド項目管理', 'class' => 'btn')),
			array('controller' => 'petit_custom_field_config_metas', 'action' => 'index', $data['PetitCustomFieldConfig']['id']), array('title' => 'フィールド項目管理')) ?>
	<?php $this->BcBaser->link($this->BcBaser->getImg('admin/icn_tool_edit.png', array('width' => 24, 'height' => 24, 'alt' => 'フィールドグループを編集', 'class' => 'btn')),
			array('action' => 'edit', $data['PetitCustomFieldConfig']['id']), array('title' => 'フィールドグループを編集')) ?>
	<?php $this->BcBaser->link($this->BcBaser->getImg('admin/icn_tool_delete.png', array('width' => 24, 'height' => 24, 'alt' => 'フィールドグループを削除', 'class' => 'btn')),
		array('action' => 'ajax_delete', $data['PetitCustomFieldConfig']['id']), array('title' => 'フィールドグループを削除', 'class' => 'btn-delete')) ?>
	</td>
	<td><?php echo $data['PetitCustomFieldConfig']['id']; ?></td>
	<td>
		<?php echo $this->BcBaser->link($this->BcText->arrayValue($data['PetitCustomFieldConfig']['content_id'], $blogContentDatas, ''),
				array('controller' => 'petit_custom_field_config_metas', 'action' => 'index', $data['PetitCustomFieldConfig']['id']), array('title' => 'フィールド項目管理')) ?>
		<?php //echo $data['PetitCustomFieldConfig']['key'] ?>
		<?php //echo $data['PetitCustomFieldConfig']['value'] ?>
	</td>
	<td>
		<?php if (!$this->PetitCustomField->hasCustomField($data)): ?>
			<?php $this->BcBaser->link($this->BcBaser->getImg('admin/btn_add.png', array('width' => 18, 'height' => 18, 'alt' => '新規項目', 'class' => 'btn')).'新規項目',
			array('controller' => 'petit_custom_field_config_fields', 'action' => 'add', $data['PetitCustomFieldConfig']['id'])) ?>
		<?php else: ?>
			<?php echo count($data['PetitCustomFieldConfigMeta']) ?>
		<?php endif ?>
	</td>
	<td>
		<?php echo $this->BcText->arrayValue($data['PetitCustomFieldConfig']['form_place'], $customFieldConfig['form_place'], '<small>指定なし</small>') ?>
	</td>
	<td style="white-space: nowrap">
		<?php echo $this->BcTime->format('Y-m-d', $data['PetitCustomFieldConfig']['created']) ?>
		<br />
		<?php echo $this->BcTime->format('Y-m-d', $data['PetitCustomFieldConfig']['modified']) ?>
	</td>
</tr>
