<?php
/**
 * [ADMIN] PetitCustomField
 *
 * @link			http://www.materializing.net/
 * @author			arata
 * @package			PetitCustomField
 * @license			MIT
 */
$this->BcBaser->js(array(
	'admin/libs/jquery.baser_ajax_data_list', 
	'admin/libs/jquery.baser_ajax_batch', 
	'admin/libs/baser_ajax_data_list_config',
	'admin/libs/baser_ajax_batch_config'
));
?>
<script type="text/javascript">
$(document).ready(function(){
	$.baserAjaxDataList.init();
	$.baserAjaxBatch.init({ url: $("#AjaxBatchUrl").html()});
});
</script>

<div id="AjaxBatchUrl" style="display:none"><?php $this->BcBaser->url(array('controller' => 'petit_custom_field_config_metas', 'action' => 'ajax_batch')) ?></div>
<div id="AlertMessage" class="message" style="display:none"></div>
<div id="DataList" class="bca-data-list"><?php $this->BcBaser->element('petit_custom_field_config_metas/index_list') ?></div>
