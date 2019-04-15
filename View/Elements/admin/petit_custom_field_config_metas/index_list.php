<?php
/**
 * [ADMIN] PetitCustomField
 *
 * @link			http://www.materializing.net/
 * @author			arata
 * @package			PetitCustomField
 * @license			MIT
 */
?>
<?php $this->BcBaser->element('pagination') ?>

<h3>
<?php $this->BcBaser->link('≫[' . trim($this->BcText->arrayValue($contentId, $blogContentDatas)) .'] ブログ設定', array(
	'admin' => true, 'plugin' => 'blog', 'controller' => 'blog_contents',
	'action' => 'edit', $contentId
)) ?>
&nbsp;&nbsp;&nbsp;&nbsp;
<?php $this->BcBaser->link('≫[' . trim($this->BcText->arrayValue($contentId, $blogContentDatas)) .'] 記事一覧', array(
	'admin' => true, 'plugin' => 'blog', 'controller' => 'blog_posts',
	'action' => 'index', $contentId
)) ?>
</h3>

<table cellpadding="0" cellspacing="0" class="list-table sort-table" id="ListTable">
	<thead>
		<tr>
			<th class="list-tool">
				<div>
					<?php $this->BcBaser->link($this->BcBaser->getImg('admin/btn_add.png', array('alt' => '新規項目追加', 'class' => 'btn'))."新規項目追加",
							array('controller' => 'petit_custom_field_config_fields', 'action' => 'add', $configId),
							array('style' => 'text-decoration:underline;')) ?>
				</div>
			</th>
			<th><?php echo $this->Paginator->sort('position', array(
					'asc' => $this->BcBaser->getImg('admin/blt_list_down.png', array('alt' => '昇順', 'title' => '昇順')).' 並び順',
					'desc' => $this->BcBaser->getImg('admin/blt_list_up.png', array('alt' => '降順', 'title' => '降順')).' 並び順'),
					array('escape' => false, 'class' => 'btn-direction')) ?>
			</th>
			<th>
				カスタムフィールド名<br /><small>ラベル名</small>
			</th>
			<th>
				フィールド名
			</th>
			<th>
				フィールドタイプ
			</th>
			<th>
				必須設定<br /><small>変換処理</small>
			</th>
		</tr>
	</thead>
	<tbody>
<?php if(!empty($datas)): ?>
	<?php foreach ($datas as $key => $data): ?>
		<?php $this->BcBaser->element('petit_custom_field_config_metas/index_row', array('data' => $data, 'count' => ($key + 1))) ?>
	<?php endforeach; ?>
<?php else: ?>
	<tr>
		<td colspan="6"><p class="no-data">データがありません。</p></td>
	</tr>
<?php endif; ?>
	</tbody>
</table>

<!-- list-num -->
<?php //$this->BcBaser->element('list_num') ?>
