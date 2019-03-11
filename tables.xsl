<?xml version="1.0" encoding="UTF-8"?>



<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>Структура БД</title>
                <link rel="stylesheet" href="css/bootstrap.min.css"/>
            </head>
            <body>
                
                <div class="container my-5 border shadow-lg">
                    <div class="d-flex justify-content-center my-3">
                        <form id="FormTable" style="min-width:20%;max-width:30%">
                            <label class=" d-flex justify-content-center" 
                                   for="TableSel">Выбранная БД</label>
                            <select name="TableSel" id="TableSel" class="custom-select mr-sm-2">
                                <xsl:for-each select="tables/table">
                                    <option><xsl:value-of select="@name"/></option>
                                </xsl:for-each>
                            </select>
                        </form>
                    </div>
                    <div class="d-flex justify-content-between my-3">
                        <button id="AddTable" type="button" class="btn btn-warning shadow-sm">
                            Создать таблицу
                        </button>
                        <button id="EditTable" type="button" class="btn btn-warning shadow-sm">
                            Изменить таблицу
                        </button>
                        <button id="DelTable" type="button" class="btn btn-warning shadow-sm">
                            Удалить таблицу
                        </button>
                    </div>
                </div>
                
                <div id="table2" class="container my-5 border shadow-lg">    
                    <div class="d-flex justify-content-center">
                        <h3>Основной ключ</h3>
                    </div>
                    <table class="table my-4 mx-0 px-0 table-borderless">
                        <thead>
                            <tr class="table-warning">
                                <th scope="col">Название поля</th>
                                <th scope="col">Тип данных</th>
                                <th scope="col">Автоинкримент</th>
                            </tr>
                        </thead>
                        <tbody id="TablePrimaryKey">
                            
                        </tbody>
                    </table>  
                </div>    
                    
                <div id="table1" class="container my-5 border shadow-lg">    
                    <div class="d-flex justify-content-center">
                        <h3>Поля несвязанных данных</h3>
                    </div>
                    <table class="table my-4 mx-0 px-0 table-borderless">
                        <thead>
                            <tr class="table-warning">
                                <th scope="col">№</th>
                                <th scope="col">Название поля</th>
                                <th scope="col">Тип данных</th>
                                <th scope="col">Default</th>
                            </tr>
                        </thead>
                        <tbody id="TableParamBody">
                            
                        </tbody>
                    </table>  
                </div>
                
                <div id="table3" class="container my-5 border shadow-lg">    
                    <div class="d-flex justify-content-center">
                        <h3>Поля связанных данных</h3>
                    </div>
                    <table class="table my-4 mx-0 px-0 table-borderless">
                        <thead>
                            <tr class="table-warning">
                                <th scope="col">№</th>
                                <th scope="col">Название ссылки</th>
                                <th scope="col">Название таблицы</th>
                            </tr>
                        </thead>
                        <tbody id="TableSrcBody">
                            
                        </tbody>
                    </table>  
                </div>
                
                <div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="MTitle"></h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">x</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="BidFormTable">
                                    <div class="form-group row">
                                        <label for="nametable" class="col-sm-4 col-form-label">Название таблицы</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" name="nametable" id="nametable"/>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-5 justify-content-center">
                                        <h5>Основной ключ</h5>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-4 col-form-label">Имя поля</label>
                                        <label class="col-sm-4 col-form-label">Тип данных</label>
                                        <label class="col-sm-4 col-form-label">Автоинкриментирование</label>
                                    </div>
                                    <span id="FormModalPrim"></span>
                                    

                                    <div class="d-flex mt-5 justify-content-center">
                                        <h5>Несвязанные поля</h5>
                                    </div>                                    
                                    <div class="form-group row">
                                        <label class="col-sm-1 col-form-label">№</label>
                                        <label class="col-sm-3 col-form-label">Имя поля</label>
                                        <label class="col-sm-3 col-form-label">Тип данных</label>
                                        <label class="col-sm-5 col-form-label">Значение по умолчанию</label>
                                    </div>
                                    <span id="FormModal"></span>
                                   <div class="d-flex justify-content-center">
                                        <button type="button" id="AddParam" class="btn btn-info">Добавить поле</button>
                                   </div>
                                   
                                   
                                   <div class="d-flex mt-5 justify-content-center">
                                        <h5>Cвязанные поля</h5>
                                    </div>                                    
                                    <div class="form-group row">
                                        <label class="col-sm-1 col-form-label">№</label>
                                        <label class="col-sm-5 col-form-label">Имя ссылки</label>
                                        <label class="col-sm-6 col-form-label">Название таблицы</label>

                                    </div>
                                    <span id="FormModalSrc"></span>
                                   <div class="d-flex justify-content-center">
                                        <button type="button" id="AddSrc" class="btn btn-success">Добавить поле</button>
                                   </div>
                                   
                                    <textarea id="FormTextarea" name="table" style="display: none">
                    
                                    </textarea>
                                    <textarea id="FormTextareaPrim" name="tablePrim" style="display: none">
                    
                                    </textarea>
                                    <textarea id="FormTextareaSrc" name="tableSrc" style="display: none">
                    
                                    </textarea>
                                    <span id="ContainerSrc1" style="display: none">
                                        
                                    </span>
                                    <span id="ContainerSrc2" style="display: none">
                                        
                                    </span>                                                                                                                
                                </form>
                            </div>
                            <div class="modal-footer d-flex justify-content-between">
                                <button type="button" id="MBtn" class="btn btn-warning"></button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="display: none">
                    <form id="BigKostyl">
                        <input type="text" id="BigKostyl1" name="name1" value=""/>
                        <input type="text" id="BigKostyl2" name="name2" value=""/>
                    </form>
                </div>                 
                   
                <script src="jquery-3.3.1.min.js" ></script>
                <script src="popper.min.js" ></script>
                <script src="js/bootstrap.min.js"></script>
                <script src="tables.js"></script>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
