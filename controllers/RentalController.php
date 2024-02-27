<?php

namespace app\controllers;

use Yii;
use yii\db\Query;
use app\models\Staff;
use yii\helpers\Html;
use yii\web\Response;
use app\models\Rental;
use yii\web\Controller;
use yii\helpers\VarDumper;
use yii\filters\VerbFilter;
use app\models\RentalSearch;
use yii\helpers\ArrayHelper;
use yii\web\NotFoundHttpException;
use app\models\Customer; // Add the Customer model import

/**
 * RentalController implements the CRUD actions for Rental model.
 */
class RentalController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return array_merge(
            parent::behaviors(),
            [
                'verbs' => [
                    'class' => VerbFilter::class,
                    'actions' => [
                        'delete' => ['POST'],
                    ],
                ],
            ]
        );
    }

    /**
     * Lists all Rental models.
     *
     * @return string
     */
    public function actionIndex()
    {
        $searchModel = new RentalSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Rental model.
     * @param int $rental_id Rental ID
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($rental_id)
    {
        return $this->render('view', [
            'model' => $this->findModel($rental_id),
        ]);
    }

    /**
     * Creates a new Rental model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new Rental();

        if ($this->request->isPost) {
            if ($model->load($this->request->post()) && $model->save()) {
                return $this->redirect(['view', 'rental_id' => $model->rental_id]);
            }
        } else {
            $model->loadDefaultValues();
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Rental model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $rental_id Rental ID
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($rental_id)
    {
        $model = $this->findModel($rental_id);
    
        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'rental_id' => $model->rental_id]);
        }
    
        // Get customer and staff data
        $customerList = ArrayHelper::map(Customer::find()->all(), 'customer_id', 'name'); // Replace 'name' with desired field
        $staffList = ArrayHelper::map(Staff::find()->all(), 'staff_id', 'name'); // Replace 'name' with desired field
    
        // Pre-populate dropdown values
        $selectedCustomer = $model->customer_id; // Assuming 'customer_id' is the field in your model
        $selectedStaff = $model->staff_id; // Assuming 'staff_id' is the field in your model
    
        return $this->render('update', [
            'model' => $model,
            'customerList' => $customerList,
            'staffList' => $staffList,
            'selectedCustomer' => $selectedCustomer,
            'selectedStaff' => $selectedStaff,
        ]);
    }
    


    

    /**
     * Deletes an existing Rental model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param int $rental_id Rental ID
     * @return \yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($rental_id)
    {
        $this->findModel($rental_id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Rental model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $rental_id Rental ID
     * @return Rental the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($rental_id)
    {
        if (($model = Rental::findOne(['rental_id' => $rental_id])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }

    // Aksi controller untuk mendapatkan daftar customer berdasarkan inventory_id
    public function actionGetCustomers()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $inventoryId = Yii::$app->request->post('depdrop_parents')[0]; // Ambil inventory_id dari POST data

        // Query database untuk mendapatkan daftar customer berdasarkan inventory_id
        $customers = Customer::find()->all();
        $output = [];
        foreach ($customers as $customer) {
            $output[] = ['id' => $customer->customer_id, 'name' => $customer->first_name];
        }

        return ['output' => $output, 'selected' => ''];
    }

    // Aksi controller untuk mendapatkan daftar staff berdasarkan customer_id
    public function actionGetStaffs()
    {
    Yii::$app->response->format = Response::FORMAT_JSON;

    $customerId = Yii::$app->request->post('depdrop_parents')[0]; // Ambil customer_id dari POST data

    // Query database untuk mendapatkan daftar staff berdasarkan customer_id
    $staffs = Staff::find()->all();
    // Format data sebagai array yang dapat diproses oleh plugin DepDrop
    $output = [];
    foreach ($staffs as $staff) {
        $output[] = ['id' => $staff->staff_id, 'name' => $staff->first_name];
    }

    return ['output' => $output, 'selected' => ''];
    }   
    public function actionViewReport($film_id,$staff_id,$rental_date,$return_date)
    {
    $searchModel = new Rental();
    $dataProvider = $searchModel->SearchingReport($film_id,$staff_id,$rental_date,$return_date);
    // VarDumper::dump($dataProvider);
    echo Html::encode(VarDumper::dump($dataProvider));
    return $this->render('index', [
        'dataProvider' => $dataProvider,
    ]);
    }
    
}