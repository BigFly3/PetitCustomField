<?php

/**
 * [HelperEventListener] PetitCustomField
 *
 * @link			http://www.materializing.net/
 * @author			arata
 * @package			PetitCustomField
 * @license			MIT
 */
class PetitCustomFieldHelperEventListener extends BcHelperEventListener
{

	/**
	 * 登録イベント
	 *
	 * @var array
	 */
	public $events = array(
		'Form.afterCreate',
		'Form.afterForm',
		'Form.afterEnd',
		'Form.afterInput',
	);

	/**
	 * 処理対象とするコントローラー
	 * 
	 * @var array
	 */
	private $targetController = array('blog_posts');

	/**
	 * 処理対象とするアクション
	 * 
	 * @var array
	 */
	private $targetAction = array('admin_edit', 'admin_add');

	/**
	 * カスタムフィールドの表示を判定
	 * 
	 * @var boolean
	 */
	private $isDisplay = false;

	/**
	 * formAfterCreate
	 * - ブログ記事追加・編集画面にプチ・カスタムフィールド編集欄を追加する
	 * - 記事編集画面の上部に追加する
	 * 
	 * @param CakeEvent $event
	 * @return array
	 */
	public function formAfterCreate(CakeEvent $event)
	{
		if (!BcUtil::isAdminSystem()) {
			return $event->data['out'];
		}

		$View = $event->subject();

		if (!in_array($View->request->params['controller'], $this->targetController)) {
			return $event->data['out'];
		}

		if (!in_array($View->request->params['action'], $this->targetAction)) {
			return $event->data['out'];
		}

		$targetId = array('BlogPostForm', 'BlogPostForm');
		if (!in_array($event->data['id'], $targetId)) {
			return $event->data['out'];
		}

		if (!isset($View->request->data['PetitCustomFieldConfig']) || empty($View->request->data['PetitCustomFieldConfig'])) {
			return $event->data['out'];
		}

		if (!$View->request->data['PetitCustomFieldConfig']['status']) {
			return $event->data['out'];
		}

		if ($View->request->data['PetitCustomFieldConfig']['form_place'] === 'top') {
			// ブログ記事追加画面にプチ・カスタムフィールド編集欄を追加する
			$event->data['out']	 = $event->data['out'] . $View->element('PetitCustomField.petit_custom_field_form');
			$this->isDisplay	 = true;
		}

		return $event->data['out'];
	}

	/**
	 * formAfterForm
	 * - ブログ記事追加・編集画面にプチ・カスタムフィールド編集欄を追加する
	 * - 記事編集画面の下部に追加する
	 * 
	 * @param CakeEvent $event
	 */
	public function formAfterForm(CakeEvent $event)
	{
		if (!BcUtil::isAdminSystem()) {
			return;
		}

		$View = $event->subject();

		if (!in_array($View->request->params['controller'], $this->targetController)) {
			return;
		}

		if (!in_array($View->request->params['action'], $this->targetAction)) {
			return;
		}

		if (!isset($View->request->data['PetitCustomFieldConfig']) || empty($View->request->data['PetitCustomFieldConfig'])) {
			return;
		}

		if (!$View->request->data['PetitCustomFieldConfig']['status']) {
			return;
		}

		if ($this->isDisplay) {
			return;
		}

		if ($View->request->data['PetitCustomFieldConfig']['form_place'] === 'normal') {
			// ブログ記事追加画面にプチ・カスタムフィールド編集欄を追加する
			echo $View->element('PetitCustomField.petit_custom_field_form');
		}
	}

	/**
	 * formAfterEnd
	 * - ブログ設定編集画面にプチ・カスタムフィールド設定編集リンクを表示する
	 * 
	 * @param CakeEvent $event
	 * @return array
	 */
	public function formAfterEnd(CakeEvent $event)
	{
		if (!BcUtil::isAdminSystem()) {
			return $event->data['out'];
		}

		$View = $event->subject();

		if ($View->request->params['controller'] != 'blog_contents') {
			return $event->data['out'];
		}

		if ($View->request->params['action'] != 'admin_edit') {
			return $event->data['out'];
		}

		if (!isset($View->request->data['PetitCustomFieldConfig']) || empty($View->request->data['PetitCustomFieldConfig'])) {
			return $event->data['out'];
		}

		if (!$View->request->data['PetitCustomFieldConfig']['status']) {
			return $event->data['out'];
		}

		// ブログ設定編集画面にプチ・カスタムフィールドメタ設定一覧リンクを表示する
		if ($event->data['id'] == 'BlogContentAdminEditForm') {
			$output				 = '<div id="PetitCustomFieldConfigBox">';
			$output .= $View->BcBaser->getLink('≫カスタム項目の設定', array(
				'plugin'	 => 'petit_custom_field',
				'controller' => 'petit_custom_field_config_metas',
				'action'	 => 'index', $View->viewVars['blogContent']['PetitCustomFieldConfig']['id']
			));
			$output .= '</div>';
			$event->data['out']	 = $event->data['out'] . $output;
		}

		return $event->data['out'];
	}

	public function formAfterInput(CakeEvent $event) {
		$View = $event->subject();
		$adminTheme = Configure::read('petitCustomField.isNewThemeAdmin');
		if($adminTheme){
			if($event->data['formId'] == 'BlogPostForm' && $event->data['fieldName'] == 'BlogPost.detail_tmp') {
				if($View->request->data['PetitCustomFieldConfig']['form_place'] === 'editor_after'){
					//新仕様だとエディタのhiddenと分断して挿入されてしまうので気持ち悪いけど、動作は問題なさそうなのでこのまま。
					$event->data['out'] = $event->data['out'].'</section><section class="bca-section">'.$View->element('PetitCustomField.petit_custom_field_form').'</table></section><section class="bca-section">';
					return $event->data['out'];
				}
			}
		}else{
			if($event->data['formId'] == 'BlogPostForm' && $event->data['fieldName'] == 'BlogPost.detail') {
				if($View->request->data['PetitCustomFieldConfig']['form_place'] === 'editor_after'){
					$event->data['out'] = $event->data['out'].'</div>'.$View->element('PetitCustomField.petit_custom_field_form').'</table><div class="section">';
					return $event->data['out'];
				}
			}
		}
    }
}
